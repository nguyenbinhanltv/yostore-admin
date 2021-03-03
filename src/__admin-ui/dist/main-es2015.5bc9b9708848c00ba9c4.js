    fragment Role on Role {
        id
        createdAt
        updatedAt
        code
        description
        permissions
        channels {
            id
            code
            token
        }
    }
`,Zf=H.gql`
    fragment Administrator on Administrator {
        id
        createdAt
        updatedAt
        firstName
        lastName
        emailAddress
        user {
            id
            identifier
            lastLogin
            roles {
                ...Role
            }
        }
    }
    ${Rf}
`,Nf=H.gql`
    query GetAdministrators($options: AdministratorListOptions) {
        administrators(options: $options) {
            items {
                ...Administrator
            }
            totalItems
        }
    }
    ${Zf}
`,Ff=H.gql`
    query GetActiveAdministrator {
        activeAdministrator {
            ...Administrator
        }
    }
    ${Zf}
`,jf=H.gql`
    query GetAdministrator($id: ID!) {
        administrator(id: $id) {
            ...Administrator
        }
    }
    ${Zf}
`,Bf=H.gql`
    mutation CreateAdministrator($input: CreateAdministratorInput!) {
        createAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${Zf}
`,zf=H.gql`
    mutation UpdateAdministrator($input: UpdateAdministratorInput!) {
        updateAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${Zf}
`,Uf=H.gql`
    mutation UpdateActiveAdministrator($input: UpdateActiveAdministratorInput!) {
        updateActiveAdministrator(input: $input) {
            ...Administrator
        }
    }
    ${Zf}
`,$f=H.gql`
    mutation DeleteAdministrator($id: ID!) {
        deleteAdministrator(id: $id) {
            result
            message
        }
    }
`,qf=H.gql`
    query GetRoles($options: RoleListOptions) {
        roles(options: $options) {
            items {
                ...Role
            }
            totalItems
        }
    }
    ${Rf}
`,Gf=H.gql`
    query GetRole($id: ID!) {
        role(id: $id) {
            ...Role
        }
    }
    ${Rf}
`,Wf=H.gql`
    mutation CreateRole($input: CreateRoleInput!) {
        createRole(input: $input) {
            ...Role
        }
    }
    ${Rf}
`,Yf=H.gql`
    mutation UpdateRole($input: UpdateRoleInput!) {
        updateRole(input: $input) {
            ...Role
        }
    }
    ${Rf}
`,Qf=H.gql`
    mutation DeleteRole($id: ID!) {
        deleteRole(id: $id) {
            result
            message
        }
    }
`;H.gql`
    mutation AssignRoleToAdministrator($administratorId: ID!, $roleId: ID!) {
        assignRoleToAdministrator(administratorId: $administratorId, roleId: $roleId) {
            ...Administrator
        }
    }
    ${Zf}
`;class Xf{constructor(e){this.baseDataService=e}getAdministrators(e=10,t=0){return this.baseDataService.query(Nf,{options:{take:e,skip:t}})}getActiveAdministrator(e="cache-first"){return this.baseDataService.query(Ff,{},e)}getAdministrator(e){return this.baseDataService.query(jf,{id:e})}createAdministrator(e){return this.baseDataService.mutate(Bf,{input:e})}updateAdministrator(e){return this.baseDataService.mutate(zf,{input:e})}updateActiveAdministrator(e){return this.baseDataService.mutate(Uf,{input:e})}deleteAdministrator(e){return this.baseDataService.mutate($f,{id:e})}getRoles(e=10,t=0){return this.baseDataService.query(qf,{options:{take:e,skip:t}})}getRole(e){return this.baseDataService.query(Gf,{id:e})}createRole(e){return this.baseDataService.mutate(Wf,{input:e})}updateRole(e){return this.baseDataService.mutate(Yf,{input:e})}deleteRole(e){return this.baseDataService.mutate(Qf,{id:e})}}const Kf=H.gql`
    fragment ConfigurableOperation on ConfigurableOperation {
        args {
            name
            value
        }
        code
    }
`,Jf=H.gql`
    fragment ConfigurableOperationDef on ConfigurableOperationDefinition {
        args {
            name
            type
            required
            defaultValue
            list
            ui
            label
        }
        code
        description
    }
`,eg=H.gql`
    fragment ErrorResult on ErrorResult {
        errorCode
        message
    }
`,tg=H.gql`
    fragment CurrentUser on CurrentUser {
        id
        identifier
        channels {
            id
            code
            token
            permissions
        }
    }
`,ng=H.gql`
    mutation AttemptLogin($username: String!, $password: String!, $rememberMe: Boolean!) {
        login(username: $username, password: $password, rememberMe: $rememberMe) {
            ...CurrentUser
            ...ErrorResult
        }
    }
    ${tg}
    ${eg}
`,rg=H.gql`
    mutation LogOut {
        logout {
            success
        }
    }
`,ig=H.gql`
    query GetCurrentUser {
        me {
            ...CurrentUser
        }
    }
    ${tg}
`;class sg{constructor(e){this.baseDataService=e}currentUser(){return this.baseDataService.query(ig)}attemptLogin(e,t,n){return this.baseDataService.mutate(ng,{username:e,password:t,rememberMe:n})}logOut(){return this.baseDataService.mutate(rg)}}class ag{constructor(e){this.location=e}set(e,t){const n=this.keyName(e);localStorage.setItem(n,JSON.stringify(t))}setForCurrentLocation(e,t){const n=this.getLocationBasedKey(e);this.set(n,t)}setForSession(e,t){const n=this.keyName(e);sessionStorage.setItem(n,JSON.stringify(t))}get(e){const t=this.keyName(e),n=sessionStorage.getItem(t)||localStorage.getItem(t);let r;try{r=JSON.parse(n||"null")}catch(i){console.error(`Could not parse the localStorage value for "${e}" (${n})`)}return r}getForCurrentLocation(e){const t=this.getLocationBasedKey(e);return this.get(t)}remove(e){const t=this.keyName(e);sessionStorage.removeItem(t),localStorage.removeItem(t)}getLocationBasedKey(e){return e+this.location.path()}keyName(e){return"vnd_"+e}}ag.\u0275fac=function(e){return new(e||ag)(r.mc(i.k))},ag.\u0275prov=Object(r.Yb)({factory:function(){return new ag(Object(r.mc)(i.k))},token:ag,providedIn:"root"}),ag.ctorParameters=()=>[{type:i.k}];const og=H.gql`
    mutation RequestStarted {
        requestStarted @client
    }
`,cg=H.gql`
    mutation RequestCompleted {
        requestCompleted @client
    }
`,lg=H.gql`
    fragment UserStatus on UserStatus {
        username
        isLoggedIn
        loginTime
        activeChannelId
        permissions
        channels {
            id
            code
            token
            permissions
        }
    }
`,ug=H.gql`
    mutation SetAsLoggedIn($input: UserStatusInput!) {
        setAsLoggedIn(input: $input) @client {
            ...UserStatus
        }
    }
    ${lg}
`,hg=H.gql`
    mutation SetAsLoggedOut {
        setAsLoggedOut @client {
            ...UserStatus
        }
    }
    ${lg}
`,dg=H.gql`
    mutation SetUiLanguage($languageCode: LanguageCode!) {
        setUiLanguage(languageCode: $languageCode) @client
    }
`,pg=H.gql`
    mutation SetUiTheme($theme: String!) {
        setUiTheme(theme: $theme) @client
    }
`,fg=H.gql`
    query GetNetworkStatus {
        networkStatus @client {
            inFlightRequests
        }
    }
`,gg=H.gql`
    query GetUserStatus {
        userStatus @client {
            ...UserStatus
        }
    }
    ${lg}
`,mg=H.gql`
    query GetUiState {
        uiState @client {
            language
            theme
        }
    }
`,yg=H.gql`
    query GetClientState {
        networkStatus @client {
            inFlightRequests
        }
        userStatus @client {
            ...UserStatus
        }
        uiState @client {
            language
            theme
        }
    }
    ${lg}
`,bg=H.gql`
    mutation SetActiveChannel($channelId: ID!) {
        setActiveChannel(channelId: $channelId) @client {
            ...UserStatus
        }
    }
    ${lg}
`,vg=H.gql`
    mutation UpdateUserChannels($channels: [CurrentUserChannelInput!]!) {
        updateUserChannels(channels: $channels) @client {
            ...UserStatus
        }
    }
    ${lg}
`;class Cg{constructor(e,t){this.queryRef=e,this.apollo=t,this.completed$=new Fe.a,this.valueChanges=e.valueChanges}refetchOnChannelChange(){const e=this.apollo.watchQuery({query:gg}).valueChanges,t=e.pipe(Object(s.a)(e=>e.data.userStatus.activeChannelId),Object(a.a)(Ne.notNullOrUndefined),Object(o.a)(),l(1),Object(d.a)(this.completed$)),n=e.pipe(Object(s.a)(e=>e.data.userStatus.isLoggedIn),Object(o.a)(),l(1),Object(a.a)(e=>!e),Object(d.a)(this.completed$));return this.valueChanges=Object(je.a)(t,this.queryRef.valueChanges).pipe(Object(p.a)(e=>{"string"==typeof e&&new Promise(e=>setTimeout(e,50)).then(()=>this.queryRef.refetch())}),Object(a.a)(e=>"string"!=typeof e),Object(d.a)(n),Object(d.a)(this.completed$)),this.queryRef.valueChanges=this.valueChanges,this}get single$(){return this.valueChanges.pipe(Object(a.a)(e=>e.networkStatus===H.NetworkStatus.ready),Object(f.a)(1),Object(s.a)(e=>e.data),Object(g.a)(()=>{this.completed$.next(),this.completed$.complete()}))}get stream$(){return this.valueChanges.pipe(Object(a.a)(e=>e.networkStatus===H.NetworkStatus.ready),Object(s.a)(e=>e.data),Object(g.a)(()=>{this.completed$.next(),this.completed$.complete()}))}get ref(){return this.queryRef}mapSingle(e){return this.single$.pipe(Object(s.a)(e))}mapStream(e){return this.stream$.pipe(Object(s.a)(e))}}const Sg=H.gql`
    fragment Country on Country {
        id
        createdAt
        updatedAt
        code
        name
        enabled
        translations {
            id
            languageCode
            name
        }
    }
`,wg=H.gql`
    query GetCountryList($options: CountryListOptions) {
        countries(options: $options) {
            items {
                id
                code
                name
                enabled
            }
            totalItems
        }
    }
`,_g=H.gql`
    query GetAvailableCountries {
        countries(options: { filter: { enabled: { eq: true } } }) {
            items {
                id
                code
                name
                enabled
            }
        }
    }
`,Ag=H.gql`
    query GetCountry($id: ID!) {
        country(id: $id) {
            ...Country
        }
    }
    ${Sg}
`,Og=H.gql`
    mutation CreateCountry($input: CreateCountryInput!) {
        createCountry(input: $input) {
            ...Country
        }
    }
    ${Sg}
`,xg=H.gql`
    mutation UpdateCountry($input: UpdateCountryInput!) {
        updateCountry(input: $input) {
            ...Country
        }
    }
    ${Sg}
`,Mg=H.gql`
    mutation DeleteCountry($id: ID!) {
        deleteCountry(id: $id) {
            result
            message
        }
    }
`,Vg=H.gql`
    fragment Zone on Zone {
        id
        name
        members {
            ...Country
        }
    }
    ${Sg}
`,Eg=H.gql`
    query GetZones {
        zones {
            id
            createdAt
            updatedAt
            name
            members {
                createdAt
                updatedAt
                id
                name
                code
                enabled
            }
        }
    }
`,Dg=(H.gql`
    query GetZone($id: ID!) {
        zone(id: $id) {
            ...Zone
        }
    }
    ${Vg}
`,H.gql`
    mutation CreateZone($input: CreateZoneInput!) {
        createZone(input: $input) {
            ...Zone
        }
    }
    ${Vg}
`),Lg=H.gql`
    mutation UpdateZone($input: UpdateZoneInput!) {
        updateZone(input: $input) {
            ...Zone
        }
    }
    ${Vg}
`,kg=H.gql`
    mutation DeleteZone($id: ID!) {
        deleteZone(id: $id) {
            message
            result
        }
    }
`,Ig=H.gql`
    mutation AddMembersToZone($zoneId: ID!, $memberIds: [ID!]!) {
        addMembersToZone(zoneId: $zoneId, memberIds: $memberIds) {
            ...Zone
        }
    }
    ${Vg}
`,Hg=H.gql`
    mutation RemoveMembersFromZone($zoneId: ID!, $memberIds: [ID!]!) {
        removeMembersFromZone(zoneId: $zoneId, memberIds: $memberIds) {
            ...Zone
        }
    }
    ${Vg}
`,Pg=H.gql`
    fragment TaxCategory on TaxCategory {
        id
        createdAt
        updatedAt
        name
    }
`,Tg=H.gql`
    query GetTaxCategories {
        taxCategories {
            ...TaxCategory
        }
    }
    ${Pg}
`,Rg=H.gql`
    query GetTaxCategory($id: ID!) {
        taxCategory(id: $id) {
            ...TaxCategory
        }
    }
    ${Pg}
`,Zg=H.gql`
    mutation CreateTaxCategory($input: CreateTaxCategoryInput!) {
        createTaxCategory(input: $input) {
            ...TaxCategory
        }
    }
    ${Pg}
`,Ng=H.gql`
    mutation UpdateTaxCategory($input: UpdateTaxCategoryInput!) {
        updateTaxCategory(input: $input) {
            ...TaxCategory
        }
    }
    ${Pg}
`,Fg=H.gql`
    mutation DeleteTaxCategory($id: ID!) {
        deleteTaxCategory(id: $id) {
            result
            message
        }
    }
`,jg=H.gql`
    fragment TaxRate on TaxRate {
        id
        createdAt
        updatedAt
        name
        enabled
        value
        category {
            id
            name
        }
        zone {
            id
            name
        }
        customerGroup {
            id
            name
        }
    }
`,Bg=H.gql`
    query GetTaxRateList($options: TaxRateListOptions) {
        taxRates(options: $options) {
            items {
                ...TaxRate
            }
            totalItems
        }
    }
    ${jg}
`,zg=H.gql`
    query GetTaxRate($id: ID!) {
        taxRate(id: $id) {
            ...TaxRate
        }
    }
    ${jg}
`,Ug=H.gql`
    mutation CreateTaxRate($input: CreateTaxRateInput!) {
        createTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${jg}
`,$g=H.gql`
    mutation UpdateTaxRate($input: UpdateTaxRateInput!) {
        updateTaxRate(input: $input) {
            ...TaxRate
        }
    }
    ${jg}
`,qg=H.gql`
    mutation DeleteTaxRate($id: ID!) {
        deleteTaxRate(id: $id) {
            result
            message
        }
    }
`,Gg=H.gql`
    fragment Channel on Channel {
        id
        createdAt
        updatedAt
        code
        token
        pricesIncludeTax
        currencyCode
        defaultLanguageCode
        defaultShippingZone {
            id
            name
        }
        defaultTaxZone {
            id
            name
        }
    }
`,Wg=H.gql`
    query GetChannels {
        channels {
            ...Channel
        }
    }
    ${Gg}
`,Yg=H.gql`
    query GetChannel($id: ID!) {
        channel(id: $id) {
            ...Channel
        }
    }
    ${Gg}
`,Qg=H.gql`
    query GetActiveChannel {
        activeChannel {
            ...Channel
        }
    }
    ${Gg}
`,Xg=H.gql`
    mutation CreateChannel($input: CreateChannelInput!) {
        createChannel(input: $input) {
            ...Channel
            ...ErrorResult
        }
    }
    ${Gg}
    ${eg}
`,Kg=H.gql`
    mutation UpdateChannel($input: UpdateChannelInput!) {
        updateChannel(input: $input) {
            ...Channel
            ...ErrorResult
        }
    }
    ${Gg}
    ${eg}
`,Jg=H.gql`
    mutation DeleteChannel($id: ID!) {
        deleteChannel(id: $id) {
            result
            message
        }
    }
`,em=H.gql`
    fragment PaymentMethod on PaymentMethod {
        id
        createdAt
        updatedAt
        code
        enabled
        configArgs {
            name
            value
        }
        definition {
            ...ConfigurableOperationDef
        }
    }
    ${Jf}
`,tm=H.gql`
    query GetPaymentMethodList($options: PaymentMethodListOptions!) {
        paymentMethods(options: $options) {
            items {
                ...PaymentMethod
            }
            totalItems
        }
    }
    ${em}
`,nm=H.gql`
    query GetPaymentMethod($id: ID!) {
        paymentMethod(id: $id) {
            ...PaymentMethod
        }
    }
    ${em}
`,rm=H.gql`
    mutation UpdatePaymentMethod($input: UpdatePaymentMethodInput!) {
        updatePaymentMethod(input: $input) {
            ...PaymentMethod
        }
    }
    ${em}
`,im=H.gql`
    fragment GlobalSettings on GlobalSettings {
        id
        availableLanguages
        trackInventory
        outOfStockThreshold
        serverConfig {
            permissions {
                name
                description
                assignable
            }
            orderProcess {
                name
            }
        }
    }
`,sm=H.gql`
    query GetGlobalSettings {
        globalSettings {
            ...GlobalSettings
        }
    }
    ${im}
`,am=H.gql`
    mutation UpdateGlobalSettings($input: UpdateGlobalSettingsInput!) {
        updateGlobalSettings(input: $input) {
            ...GlobalSettings
            ...ErrorResult
        }
    }
    ${im}
    ${eg}
`,om=H.gql`
    fragment CustomFieldConfig on CustomField {
        name
        type
        list
        description {
            languageCode
            value
        }
        label {
            languageCode
            value
        }
        readonly
    }
`,cm=H.gql`
    fragment StringCustomField on StringCustomFieldConfig {
        ...CustomFieldConfig
        pattern
        options {
            label {
                languageCode
                value
            }
            value
        }
    }
    ${om}
`,lm=H.gql`
    fragment LocaleStringCustomField on LocaleStringCustomFieldConfig {
        ...CustomFieldConfig
        pattern
    }
    ${om}
`,um=H.gql`
    fragment BooleanCustomField on BooleanCustomFieldConfig {
        ...CustomFieldConfig
    }
    ${om}
`,hm=H.gql`
    fragment IntCustomField on IntCustomFieldConfig {
        ...CustomFieldConfig
        intMin: min
        intMax: max
        intStep: step
    }
    ${om}
`,dm=H.gql`
    fragment FloatCustomField on FloatCustomFieldConfig {
        ...CustomFieldConfig
        floatMin: min
        floatMax: max
        floatStep: step
    }
    ${om}
`,pm=H.gql`
    fragment DateTimeCustomField on DateTimeCustomFieldConfig {
        ...CustomFieldConfig
        datetimeMin: min
        datetimeMax: max
        datetimeStep: step
    }
    ${om}
`,fm=H.gql`
    fragment CustomFields on CustomField {
        ... on StringCustomFieldConfig {
            ...StringCustomField
        }
        ... on LocaleStringCustomFieldConfig {
            ...LocaleStringCustomField
        }
        ... on BooleanCustomFieldConfig {
            ...BooleanCustomField
        }
        ... on IntCustomFieldConfig {
            ...IntCustomField
        }
        ... on FloatCustomFieldConfig {
            ...FloatCustomField
        }
        ... on DateTimeCustomFieldConfig {
            ...DateTimeCustomField
        }
    }
    ${cm}
    ${lm}
    ${um}
    ${hm}
    ${dm}
    ${pm}
`,gm=H.gql`
    query GetServerConfig {
        globalSettings {
            id
            serverConfig {
                orderProcess {
                    name
                    to
                }
                permittedAssetTypes
                permissions {
                    name
                    description
                    assignable
                }
                customFieldConfig {
                    Address {
                        ...CustomFields
                    }
                    Collection {
                        ...CustomFields
                    }
                    Customer {
                        ...CustomFields
                    }
                    Facet {
                        ...CustomFields
                    }
                    FacetValue {
                        ...CustomFields
                    }
                    Fulfillment {
                        ...CustomFields
                    }
                    GlobalSettings {
                        ...CustomFields
                    }
                    Order {
                        ...CustomFields
                    }
                    OrderLine {
                        ...CustomFields
                    }
                    Product {
                        ...CustomFields
                    }
                    ProductOption {
                        ...CustomFields
                    }
                    ProductOptionGroup {
                        ...CustomFields
                    }
                    ProductVariant {
                        ...CustomFields
                    }
                    ShippingMethod {
                        ...CustomFields
                    }
                    User {
                        ...CustomFields
                    }
                }
            }
        }
    }
    ${fm}
`,mm=H.gql`
    fragment JobInfo on Job {
        id
        createdAt
        startedAt
        settledAt
        queueName
        state
        isSettled
        progress
        duration
        data
        result
        error
    }
`,ym=H.gql`
    query GetJobInfo($id: ID!) {
        job(jobId: $id) {
            ...JobInfo
        }
    }
    ${mm}
`,bm=H.gql`
    query GetAllJobs($options: JobListOptions) {
        jobs(options: $options) {
            items {
                ...JobInfo
            }
            totalItems
        }
    }
    ${mm}
`,vm=H.gql`
    query GetJobsById($ids: [ID!]!) {
        jobsById(jobIds: $ids) {
            ...JobInfo
        }
    }
    ${mm}
`,Cm=H.gql`
    query GetJobQueueList {
        jobQueues {
            name
            running
        }
    }
`,Sm=H.gql`
    mutation CancelJob($id: ID!) {
        cancelJob(jobId: $id) {
            ...JobInfo
        }
    }
    ${mm}
`,wm=H.gql`
    mutation Reindex {
        reindex {
            ...JobInfo
        }
    }
    ${mm}
`;class _m{constructor(e){this.injector=e,this._serverConfig={}}get baseDataService(){return this.injector.get(Hm)}init(){return()=>this.getServerConfig()}getServerConfig(){return this.baseDataService.query(gm).single$.toPromise().then(e=>{this._serverConfig=e.globalSettings.serverConfig},e=>{})}getAvailableLanguages(){return this.baseDataService.query(sm,{},"cache-first").mapSingle(e=>e.globalSettings.availableLanguages)}refreshGlobalSettings(){return this.baseDataService.query(sm,{},"network-only").single$}getCustomFieldsFor(e){return this.serverConfig.customFieldConfig[e]||[]}getOrderProcessStates(){return this.serverConfig.orderProcess}getPermittedAssetTypes(){return this.serverConfig.permittedAssetTypes}getPermissionDefinitions(){return this.serverConfig.permissions}get serverConfig(){return this._serverConfig}}function Am(e,t){const n=e.definitions.filter(Om);for(const r of n){let e=r.typeCondition.name.value;"OrderAddress"===e&&(e="Address");const n=t[e];if(n&&n.length){r.selectionSet.selections.push({name:{kind:Qe.a.NAME,value:"customFields"},kind:Qe.a.FIELD,selectionSet:{kind:Qe.a.SELECTION_SET,selections:n.map(e=>({kind:Qe.a.FIELD,name:{kind:Qe.a.NAME,value:e.name}}))}});const e=n.filter(e=>"localeString"===e.type),t=r.selectionSet.selections.filter(xm).find(e=>"translations"===e.name.value);e.length&&t&&t.selectionSet&&t.selectionSet.selections.push({name:{kind:Qe.a.NAME,value:"customFields"},kind:Qe.a.FIELD,selectionSet:{kind:Qe.a.SELECTION_SET,selections:e.map(e=>({kind:Qe.a.FIELD,name:{kind:Qe.a.NAME,value:e.name}}))}})}}return e}function Om(e){return e.kind===Qe.a.FRAGMENT_DEFINITION}function xm(e){return e.kind===Qe.a.FIELD}_m.\u0275fac=function(e){return new(e||_m)(r.mc(r.C))},_m.\u0275prov=r.Yb({token:_m,factory:_m.\u0275fac}),_m.ctorParameters=()=>[{type:r.C}];const Mm=/Create([A-Za-z]+)Input/,Vm=/Update([A-Za-z]+)Input/;function Em(e){const t=function(e,t){for(var n=null,r=0,i=e.definitions;r<i.length;r++){var s,a=i[r];if(a.kind===Qe.a.OPERATION_DEFINITION)if(null==t){if(n)return null;n=a}else if((null===(s=a.name)||void 0===s?void 0:s.value)===t)return a}return n}(e,null);if(t&&t.variableDefinitions)for(const n of t.variableDefinitions){const e=Dm(n.type).name.value,t=e.match(Mm);if(t)return t[1];const r=e.match(Vm);if(r)return r[1]}}function Dm(e){return"NonNullType"===e.kind||"ListType"===e.kind?Dm(e.type):e}function Lm(e,t){for(const n of t)if(n.readonly)if("localeString"===n.type){if(Im(e))for(const t of e.translations)km(t)&&void 0!==t.customFields[n.name]&&delete t.customFields[n.name]}else km(e)&&void 0!==e.customFields[n.name]&&delete e.customFields[n.name];return e}function km(e){return null!=e&&e.hasOwnProperty("customFields")}function Im(e){return null!=e&&e.hasOwnProperty("translations")}class Hm{constructor(e,t,n,r){this.apollo=e,this.httpClient=t,this.localStorageService=n,this.serverConfigService=r}get customFields(){return this.serverConfigService.serverConfig.customFieldConfig||{}}query(e,t,n="cache-and-network"){const r=Am(e,this.customFields),i=this.apollo.watchQuery({query:r,variables:t,fetchPolicy:n});return new Cg(i,this.apollo)}mutate(e,t,n){const r=Am(e,this.customFields),i=this.removeReadonlyCustomFieldsFromVariables(e,t);return this.apollo.mutate({mutation:r,variables:i,update:n}).pipe(Object(s.a)(e=>e.data))}removeReadonlyCustomFieldsFromVariables(e,t){const n=Em(e);if(n){const e=this.customFields[n];if(t&&e)return function(e,t){const n=Object(Ke.simpleDeepClone)(e);return n.input&&Lm(n.input,t),Lm(n,t)}(t,e)}return t}}Hm.\u0275fac=function(e){return new(e||Hm)(r.mc(Y),r.mc(ye),r.mc(ag),r.mc(_m))},Hm.\u0275prov=r.Yb({token:Hm,factory:Hm.\u0275fac}),Hm.ctorParameters=()=>[{type:Y},{type:ye},{type:ag},{type:_m}];class Pm{constructor(e){this.baseDataService=e}startRequest(){return this.baseDataService.mutate(og)}completeRequest(){return this.baseDataService.mutate(cg)}getNetworkStatus(){return this.baseDataService.query(fg,{},"cache-first")}loginSuccess(e,t,n){return this.baseDataService.mutate(ug,{input:{username:e,loginTime:Date.now().toString(),activeChannelId:t,channels:n}})}logOut(){return this.baseDataService.mutate(hg)}userStatus(){return this.baseDataService.query(gg,{},"cache-first")}uiState(){return this.baseDataService.query(mg,{},"cache-first")}setUiLanguage(e){return this.baseDataService.mutate(dg,{languageCode:e})}setUiTheme(e){return this.baseDataService.mutate(pg,{theme:e})}setActiveChannel(e){return this.baseDataService.mutate(bg,{channelId:e})}updateUserChannels(e){return this.baseDataService.mutate(vg,{channels:e})}}const Tm=H.gql`
    fragment Asset on Asset {
        id
        createdAt
        updatedAt
        name
        fileSize
        mimeType
        type
        preview
        source
        width
        height
        focalPoint {
            x
            y
        }
    }
`,Rm=H.gql`
    fragment ProductOptionGroup on ProductOptionGroup {
        id
        code
        languageCode
        name
        translations {
            id
            languageCode
            name
        }
    }
`,Zm=H.gql`
    fragment ProductOption on ProductOption {
        id
        code
        languageCode
        name
        groupId
        translations {
            id
            languageCode
            name
        }
    }
`,Nm=H.gql`
    fragment ProductVariant on ProductVariant {
        id
        createdAt
        updatedAt
        enabled
        languageCode
        name
        price
        currencyCode
        priceWithTax
        stockOnHand
        stockAllocated
        trackInventory
        outOfStockThreshold
        useGlobalOutOfStockThreshold
        taxRateApplied {
            id
            name
            value
        }
        taxCategory {
            id
            name
        }
        sku
        options {
            ...ProductOption
        }
        facetValues {
            id
            code
            name
            facet {
                id
                name
            }
        }
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        translations {
            id
            languageCode
            name
        }
        channels {
            id
            code
        }
    }
    ${Zm}
    ${Tm}
`,Fm=H.gql`
    fragment ProductWithVariants on Product {
        id
        createdAt
        updatedAt
        enabled
        languageCode
        name
        slug
        description
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        translations {
            id
            languageCode
            name
            slug
            description
        }
        optionGroups {
            ...ProductOptionGroup
        }
        variants {
            ...ProductVariant
        }
        facetValues {
            id
            code
            name
            facet {
                id
                name
            }
        }
        channels {
            id
            code
        }
    }
    ${Rm}
    ${Nm}
    ${Tm}
`,jm=H.gql`
    fragment ProductOptionGroupWithOptions on ProductOptionGroup {
        id
        createdAt
        updatedAt
        languageCode
        code
        name
        translations {
            id
            name
        }
        options {
            id
            languageCode
            name
            code
            translations {
                name
            }
        }
    }
`,Bm=H.gql`
    mutation UpdateProduct($input: UpdateProductInput!) {
        updateProduct(input: $input) {
            ...ProductWithVariants
        }
    }
    ${Fm}
`,zm=H.gql`
    mutation CreateProduct($input: CreateProductInput!) {
        createProduct(input: $input) {
            ...ProductWithVariants
        }
    }
    ${Fm}
`,Um=H.gql`
    mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
            result
            message
        }
    }
`,$m=H.gql`
    mutation CreateProductVariants($input: [CreateProductVariantInput!]!) {
        createProductVariants(input: $input) {
            ...ProductVariant
        }
    }
    ${Nm}
`,qm=H.gql`
    mutation UpdateProductVariants($input: [UpdateProductVariantInput!]!) {
        updateProductVariants(input: $input) {
            ...ProductVariant
        }
    }
    ${Nm}
`,Gm=H.gql`
    mutation CreateProductOptionGroup($input: CreateProductOptionGroupInput!) {
        createProductOptionGroup(input: $input) {
            ...ProductOptionGroupWithOptions
        }
    }
    ${jm}
`,Wm=H.gql`
    query GetProductOptionGroup($id: ID!) {
        productOptionGroup(id: $id) {
            ...ProductOptionGroupWithOptions
        }
    }
    ${jm}
`,Ym=H.gql`
    mutation AddOptionToGroup($input: CreateProductOptionInput!) {
        createProductOption(input: $input) {
            id
            createdAt
            updatedAt
            name
            code
            groupId
        }
    }
`,Qm=H.gql`
    mutation AddOptionGroupToProduct($productId: ID!, $optionGroupId: ID!) {
        addOptionGroupToProduct(productId: $productId, optionGroupId: $optionGroupId) {
            id
            createdAt
            updatedAt
            optionGroups {
                id
                createdAt
                updatedAt
                code
                options {
                    id
                    createdAt
                    updatedAt
                    code
                }
            }
        }
    }
`,Xm=H.gql`
    mutation RemoveOptionGroupFromProduct($productId: ID!, $optionGroupId: ID!) {
        removeOptionGroupFromProduct(productId: $productId, optionGroupId: $optionGroupId) {
            ... on Product {
                id
                createdAt
                updatedAt
                optionGroups {
                    id
                    createdAt
                    updatedAt
                    code
                    options {
                        id
                        createdAt
                        updatedAt
                        code
                    }
                }
            }
            ...ErrorResult
        }
    }
    ${eg}
`,Km=H.gql`
    query GetProductWithVariants($id: ID!) {
        product(id: $id) {
            ...ProductWithVariants
        }
    }
    ${Fm}
`,Jm=H.gql`
    query GetProductList($options: ProductListOptions) {
        products(options: $options) {
            items {
                id
                createdAt
                updatedAt
                enabled
                languageCode
                name
                slug
                featuredAsset {
                    id
                    createdAt
                    updatedAt
                    preview
                }
            }
            totalItems
        }
    }
`,ey=H.gql`
    query GetProductOptionGroups($filterTerm: String) {
        productOptionGroups(filterTerm: $filterTerm) {
            id
            createdAt
            updatedAt
            languageCode
            code
            name
            options {
                id
                createdAt
                updatedAt
                languageCode
                code
                name
            }
        }
    }
`,ty=H.gql`
    query GetAssetList($options: AssetListOptions) {
        assets(options: $options) {
            items {
                ...Asset
            }
            totalItems
        }
    }
    ${Tm}
`,ny=H.gql`
    query GetAsset($id: ID!) {
        asset(id: $id) {
            ...Asset
        }
    }
    ${Tm}
`,ry=H.gql`
    mutation CreateAssets($input: [CreateAssetInput!]!) {
        createAssets(input: $input) {
            ...Asset
            ... on ErrorResult {
                message
            }
        }
    }
    ${Tm}
`,iy=H.gql`
    mutation UpdateAsset($input: UpdateAssetInput!) {
        updateAsset(input: $input) {
            ...Asset
        }
    }
    ${Tm}
`,sy=H.gql`
    mutation DeleteAssets($ids: [ID!]!, $force: Boolean) {
        deleteAssets(ids: $ids, force: $force) {
            result
            message
        }
    }
`,ay=H.gql`
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            totalItems
            items {
                enabled
                productId
                productName
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                productVariantId
                productVariantName
                productVariantAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                sku
                channelIds
            }
            facetValues {
                count
                facetValue {
                    id
                    createdAt
                    updatedAt
                    name
                    facet {
                        id
                        createdAt
                        updatedAt
                        name
                    }
                }
            }
        }
    }
`,oy=H.gql`
    query ProductSelectorSearch($term: String!, $take: Int!) {
        search(input: { groupByProduct: false, term: $term, take: $take }) {
            items {
                productVariantId
                productVariantName
                productPreview
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
                price {
                    ... on SinglePrice {
                        value
                    }
                }
                priceWithTax {
                    ... on SinglePrice {
                        value
                    }
                }
                sku
            }
        }
    }
`,cy=H.gql`
    mutation UpdateProductOption($input: UpdateProductOptionInput!) {
        updateProductOption(input: $input) {
            ...ProductOption
        }
    }
    ${Zm}
`,ly=H.gql`
    mutation DeleteProductVariant($id: ID!) {
        deleteProductVariant(id: $id) {
            result
            message
        }
    }
`,uy=H.gql`
    query GetProductVariantOptions($id: ID!) {
        product(id: $id) {
            id
            createdAt
            updatedAt
            name
            optionGroups {
                id
                name
                code
                options {
                    ...ProductOption
                }
            }
            variants {
                id
                createdAt
                updatedAt
                enabled
                name
                sku
                price
                stockOnHand
                enabled
                options {
                    id
                    createdAt
                    updatedAt
                    name
                    code
                    groupId
                }
            }
        }
    }
    ${Zm}
`,hy=H.gql`
    mutation AssignProductsToChannel($input: AssignProductsToChannelInput!) {
        assignProductsToChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`,dy=H.gql`
    mutation AssignVariantsToChannel($input: AssignProductVariantsToChannelInput!) {
        assignProductVariantsToChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`,py=H.gql`
    mutation RemoveProductsFromChannel($input: RemoveProductsFromChannelInput!) {
        removeProductsFromChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`,fy=H.gql`
    mutation RemoveVariantsFromChannel($input: RemoveProductVariantsFromChannelInput!) {
        removeProductVariantsFromChannel(input: $input) {
            id
            channels {
                id
                code
            }
        }
    }
`,gy=H.gql`
    query GetProductVariant($id: ID!) {
        productVariant(id: $id) {
            id
            name
            sku
            product {
                id
                featuredAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
            }
        }
    }
`,my=H.gql`
    query GetCollectionFilters {
        collectionFilters {
            ...ConfigurableOperationDef
        }
    }
    ${Jf}
`,yy=H.gql`
    fragment Collection on Collection {
        id
        createdAt
        updatedAt
        name
        slug
        description
        isPrivate
        languageCode
        featuredAsset {
            ...Asset
        }
        assets {
            ...Asset
        }
        filters {
            ...ConfigurableOperation
        }
        translations {
            id
            languageCode
            name
            slug
            description
        }
        parent {
            id
            name
        }
        children {
            id
            name
        }
    }
    ${Tm}
    ${Kf}
`,by=H.gql`
    query GetCollectionList($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                id
                name
                slug
                description
                isPrivate
                featuredAsset {
                    ...Asset
                }
                parent {
                    id
                }
            }
            totalItems
        }
    }
    ${Tm}
`,vy=H.gql`
    query GetCollection($id: ID!) {
        collection(id: $id) {
            ...Collection
        }
    }
    ${yy}
`,Cy=H.gql`
    mutation CreateCollection($input: CreateCollectionInput!) {
        createCollection(input: $input) {
            ...Collection
        }
    }
    ${yy}
`,Sy=H.gql`
    mutation UpdateCollection($input: UpdateCollectionInput!) {
        updateCollection(input: $input) {
            ...Collection
        }
    }
    ${yy}
`,wy=H.gql`
    mutation MoveCollection($input: MoveCollectionInput!) {
        moveCollection(input: $input) {
            ...Collection
        }
    }
    ${yy}
`,_y=H.gql`
    mutation DeleteCollection($id: ID!) {
        deleteCollection(id: $id) {
            result
            message
        }
    }
`,Ay=H.gql`
    query GetCollectionContents($id: ID!, $options: ProductVariantListOptions) {
        collection(id: $id) {
            id
            name
            productVariants(options: $options) {
                items {
                    id
                    productId
                    name
                }
                totalItems
            }
        }
    }
`;class Oy{constructor(e){this.baseDataService=e}getCollectionFilters(){return this.baseDataService.query(my)}getCollections(e=10,t=0){return this.baseDataService.query(by,{options:{take:e,skip:t}})}getCollection(e){return this.baseDataService.query(vy,{id:e})}createCollection(e){return this.baseDataService.mutate(Cy,{input:Object(Je.pick)(e,["translations","parentId","assetIds","featuredAssetId","filters","customFields"])})}updateCollection(e){return this.baseDataService.mutate(Sy,{input:Object(Je.pick)(e,["id","isPrivate","translations","assetIds","featuredAssetId","filters","customFields"])})}moveCollection(e){return Object(Z.a)(e).pipe(Object(m.a)(e=>this.baseDataService.mutate(wy,{input:e})),function(e,t=null){return function(n){return n.lift(new y(e,t))}}(e.length))}deleteCollection(e){return this.baseDataService.mutate(_y,{id:e})}getCollectionContents(e,t=10,n=0,r){const i=r?{name:{contains:r}}:void 0;return this.baseDataService.query(Ay,{id:e,options:{skip:n,take:t,filter:i}})}}const xy=H.gql`
    fragment Address on Address {
        id
        createdAt
        updatedAt
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country {
            id
            code
            name
        }
        phoneNumber
        defaultShippingAddress
        defaultBillingAddress
    }
`,My=H.gql`
    fragment Customer on Customer {
        id
        createdAt
        updatedAt
        title
        firstName
        lastName
        phoneNumber
        emailAddress
        user {
            id
            identifier
            verified
            lastLogin
        }
        addresses {
            ...Address
        }
    }
    ${xy}
`,Vy=H.gql`
    query GetCustomerList($options: CustomerListOptions) {
        customers(options: $options) {
            items {
                id
                createdAt
                updatedAt
                title
                firstName
                lastName
                emailAddress
                user {
                    id
                    verified
                }
            }
            totalItems
        }
    }
`,Ey=H.gql`
    query GetCustomer($id: ID!, $orderListOptions: OrderListOptions) {
        customer(id: $id) {
            ...Customer
            groups {
                id
                name
            }
            orders(options: $orderListOptions) {
                items {
                    id
                    code
                    state
                    total
                    currencyCode
                    updatedAt
                }
                totalItems
            }
        }
    }
    ${My}
`,Dy=H.gql`
    mutation CreateCustomer($input: CreateCustomerInput!, $password: String) {
        createCustomer(input: $input, password: $password) {
            ...Customer
            ...ErrorResult
        }
    }
    ${My}
    ${eg}
`,Ly=H.gql`
    mutation UpdateCustomer($input: UpdateCustomerInput!) {
        updateCustomer(input: $input) {
            ...Customer
            ...ErrorResult
        }
    }
    ${My}
    ${eg}
`,ky=H.gql`
    mutation DeleteCustomer($id: ID!) {
        deleteCustomer(id: $id) {
            result
            message
        }
    }
`,Iy=H.gql`
    mutation CreateCustomerAddress($customerId: ID!, $input: CreateAddressInput!) {
        createCustomerAddress(customerId: $customerId, input: $input) {
            ...Address
        }
    }
    ${xy}
`,Hy=H.gql`
    mutation UpdateCustomerAddress($input: UpdateAddressInput!) {
        updateCustomerAddress(input: $input) {
            ...Address
        }
    }
    ${xy}
`,Py=H.gql`
    mutation CreateCustomerGroup($input: CreateCustomerGroupInput!) {
        createCustomerGroup(input: $input) {
            id
            createdAt
            updatedAt
            name
        }
    }
`,Ty=H.gql`
    mutation UpdateCustomerGroup($input: UpdateCustomerGroupInput!) {
        updateCustomerGroup(input: $input) {
            id
            createdAt
            updatedAt
            name
        }
    }
`,Ry=H.gql`
    mutation DeleteCustomerGroup($id: ID!) {
        deleteCustomerGroup(id: $id) {
            result
            message
        }
    }
`,Zy=H.gql`
    query GetCustomerGroups($options: CustomerGroupListOptions) {
        customerGroups(options: $options) {
            items {
                id
                createdAt
                updatedAt
                name
            }
            totalItems
        }
    }
`,Ny=H.gql`
    query GetCustomerGroupWithCustomers($id: ID!, $options: CustomerListOptions) {
        customerGroup(id: $id) {
            id
            createdAt
            updatedAt
            name
            customers(options: $options) {
                items {
                    id
                    createdAt
                    updatedAt
                    emailAddress
                    firstName
                    lastName
                }
                totalItems
            }
        }
    }
`,Fy=H.gql`
    mutation AddCustomersToGroup($groupId: ID!, $customerIds: [ID!]!) {
        addCustomersToGroup(customerGroupId: $groupId, customerIds: $customerIds) {
            id
            createdAt
            updatedAt
            name
        }
    }
`,jy=H.gql`
    mutation RemoveCustomersFromGroup($groupId: ID!, $customerIds: [ID!]!) {
        removeCustomersFromGroup(customerGroupId: $groupId, customerIds: $customerIds) {
            id
            createdAt
            updatedAt
            name
        }
    }
`,By=H.gql`
    query GetCustomerHistory($id: ID!, $options: HistoryEntryListOptions) {
        customer(id: $id) {
            id
            history(options: $options) {
                totalItems
                items {
                    id
                    type
                    createdAt
                    isPublic
                    administrator {
                        id
                        firstName
                        lastName
                    }
                    data
                }
            }
        }
    }
`,zy=H.gql`
    mutation AddNoteToCustomer($input: AddNoteToCustomerInput!) {
        addNoteToCustomer(input: $input) {
            id
        }
    }
`,Uy=H.gql`
    mutation UpdateCustomerNote($input: UpdateCustomerNoteInput!) {
        updateCustomerNote(input: $input) {
            id
            data
            isPublic
        }
    }
`,$y=H.gql`
    mutation DeleteCustomerNote($id: ID!) {
        deleteCustomerNote(id: $id) {
            result
            message
        }
    }
`;class qy{constructor(e){this.baseDataService=e}getCustomerList(e=10,t=0,n){const r=n?{filter:{emailAddress:{contains:n}}}:{};return this.baseDataService.query(Vy,{options:Object.assign({take:e,skip:t},r)})}getCustomer(e,t){return this.baseDataService.query(Ey,{id:e,orderListOptions:t})}createCustomer(e,t){return this.baseDataService.mutate(Dy,{input:e,password:t})}updateCustomer(e){return this.baseDataService.mutate(Ly,{input:e})}deleteCustomer(e){return this.baseDataService.mutate(ky,{id:e})}createCustomerAddress(e,t){return this.baseDataService.mutate(Iy,{customerId:e,input:t})}updateCustomerAddress(e){return this.baseDataService.mutate(Hy,{input:e})}createCustomerGroup(e){return this.baseDataService.mutate(Py,{input:e})}updateCustomerGroup(e){return this.baseDataService.mutate(Ty,{input:e})}deleteCustomerGroup(e){return this.baseDataService.mutate(Ry,{id:e})}getCustomerGroupList(e){return this.baseDataService.query(Zy,{options:e})}getCustomerGroupWithCustomers(e,t){return this.baseDataService.query(Ny,{id:e,options:t})}addCustomersToGroup(e,t){return this.baseDataService.mutate(Fy,{groupId:e,customerIds:t})}removeCustomersFromGroup(e,t){return this.baseDataService.mutate(jy,{groupId:e,customerIds:t})}getCustomerHistory(e,t){return this.baseDataService.query(By,{id:e,options:t})}addNoteToCustomer(e,t){return this.baseDataService.mutate(zy,{input:{note:t,isPublic:!1,id:e}})}updateCustomerNote(e){return this.baseDataService.mutate(Uy,{input:e})}deleteCustomerNote(e){return this.baseDataService.mutate($y,{id:e})}}const Gy=H.gql`
    fragment FacetValue on FacetValue {
        id
        createdAt
        updatedAt
        languageCode
        code
        name
        translations {
            id
            languageCode
            name
        }
        facet {
            id
            createdAt
            updatedAt
            name
        }
    }
`,Wy=H.gql`
    fragment FacetWithValues on Facet {
        id
        createdAt
        updatedAt
        languageCode
        isPrivate
        code
        name
        translations {
            id
            languageCode
            name
        }
        values {
            ...FacetValue
        }
    }
    ${Gy}
`,Yy=H.gql`
    mutation CreateFacet($input: CreateFacetInput!) {
        createFacet(input: $input) {
            ...FacetWithValues
        }
    }
    ${Wy}
`,Qy=H.gql`
    mutation UpdateFacet($input: UpdateFacetInput!) {
        updateFacet(input: $input) {
            ...FacetWithValues
        }
    }
    ${Wy}
`,Xy=H.gql`
    mutation DeleteFacet($id: ID!, $force: Boolean) {
        deleteFacet(id: $id, force: $force) {
            result
            message
        }
    }
`,Ky=H.gql`
    mutation CreateFacetValues($input: [CreateFacetValueInput!]!) {
        createFacetValues(input: $input) {
            ...FacetValue
        }
    }
    ${Gy}
`,Jy=H.gql`
    mutation UpdateFacetValues($input: [UpdateFacetValueInput!]!) {
        updateFacetValues(input: $input) {
            ...FacetValue
        }
    }
    ${Gy}
`,eb=H.gql`
    mutation DeleteFacetValues($ids: [ID!]!, $force: Boolean) {
        deleteFacetValues(ids: $ids, force: $force) {
            result
            message
        }
    }
`,tb=H.gql`
    query GetFacetList($options: FacetListOptions) {
        facets(options: $options) {
            items {
                ...FacetWithValues
            }
            totalItems
        }
    }
    ${Wy}
`,nb=H.gql`
    query GetFacetWithValues($id: ID!) {
        facet(id: $id) {
            ...FacetWithValues
        }
    }
    ${Wy}
`;class rb{constructor(e){this.baseDataService=e}getFacets(e=10,t=0){return this.baseDataService.query(tb,{options:{take:e,skip:t}})}getAllFacets(e=!1){return this.baseDataService.query(tb,{},e?"network-only":"cache-first")}getFacet(e){return this.baseDataService.query(nb,{id:e})}createFacet(e){const t={input:Object(Je.pick)(e,["code","isPrivate","translations","values","customFields"])};return this.baseDataService.mutate(Yy,t)}updateFacet(e){const t={input:Object(Je.pick)(e,["id","code","isPrivate","translations","customFields"])};return this.baseDataService.mutate(Qy,t)}deleteFacet(e,t){return this.baseDataService.mutate(Xy,{id:e,force:t})}createFacetValues(e){const t={input:e.map(Object(Je.pick)(["facetId","code","translations","customFields"]))};return this.baseDataService.mutate(Ky,t)}updateFacetValues(e){const t={input:e.map(Object(Je.pick)(["id","code","translations","customFields"]))};return this.baseDataService.mutate(Jy,t)}deleteFacetValues(e,t){return this.baseDataService.mutate(eb,{ids:e,force:t})}}const ib=H.gql`
    fragment Adjustment on Adjustment {
        adjustmentSource
        amount
        description
        type
    }
`,sb=H.gql`
    fragment Refund on Refund {
        id
        state
        items
        shipping
        adjustment
        transactionId
        paymentId
    }
`,ab=H.gql`
    fragment OrderAddress on OrderAddress {
        fullName
        company
        streetLine1
        streetLine2
        city
        province
        postalCode
        country
        countryCode
        phoneNumber
    }
`,ob=H.gql`
    fragment Order on Order {
        id
        createdAt
        updatedAt
        orderPlacedAt
        code
        state
        nextStates
        total
        currencyCode
        customer {
            id
            firstName
            lastName
        }
        shippingLines {
            shippingMethod {
                name
            }
        }
    }
`,cb=H.gql`
    fragment Fulfillment on Fulfillment {
        id
        state
        nextStates
        createdAt
        updatedAt
        method
        orderItems {
            id
        }
        trackingCode
    }
`,lb=H.gql`
    fragment OrderLine on OrderLine {
        id
        featuredAsset {
            preview
        }
        productVariant {
            id
            name
            sku
            trackInventory
            stockOnHand
        }
        discounts {
            ...Adjustment
        }
        unitPrice
        unitPriceWithTax
        proratedUnitPrice
        proratedUnitPriceWithTax
        quantity
        items {
            id
            unitPrice
            unitPriceWithTax
            taxRate
            refundId
            cancelled
            fulfillment {
                ...Fulfillment
            }
        }
        linePrice
        lineTax
        linePriceWithTax
        discountedLinePrice
        discountedLinePriceWithTax
    }
`,ub=H.gql`
    fragment OrderDetail on Order {
        id
        createdAt
        updatedAt
        code
        state
        nextStates
        active
        customer {
            id
            firstName
            lastName
        }
        lines {
            ...OrderLine
        }
        surcharges {
            id
            sku
            description
            price
            priceWithTax
            taxRate
        }
        discounts {
            ...Adjustment
        }
        promotions {
            id
            couponCode
        }
        subTotal
        subTotalWithTax
        total
        totalWithTax
        currencyCode
        shipping
        shippingWithTax
        shippingLines {
            shippingMethod {
                id
                code
                name
                fulfillmentHandlerCode
                description
            }
        }
        taxSummary {
            description
            taxBase
            taxRate
            taxTotal
        }
        shippingAddress {
            ...OrderAddress
        }
        billingAddress {
            ...OrderAddress
        }
        payments {
            id
            createdAt
            transactionId
            amount
            method
            state
            metadata
            refunds {
                id
                createdAt
                state
                items
                adjustment
                total
                paymentId
                reason
                transactionId
                method
                metadata
                orderItems {
                    id
                }
            }
        }
        fulfillments {
            ...Fulfillment
        }
        modifications {
            id
            createdAt
            isSettled
            priceChange
            note
            payment {
                id
                amount
            }
            orderItems {
                id
            }
            refund {
                id
                paymentId
                total
            }
            surcharges {
                id
            }
        }
    }
    ${ib}
    ${ab}
    ${cb}
    ${lb}
`,hb=H.gql`
    query GetOrderList($options: OrderListOptions) {
        orders(options: $options) {
            items {
                ...Order
            }
            totalItems
        }
    }
    ${ob}
`,db=H.gql`
    query GetOrder($id: ID!) {
        order(id: $id) {
            ...OrderDetail
        }
    }
    ${ub}
`,pb=H.gql`
    mutation SettlePayment($id: ID!) {
        settlePayment(id: $id) {
            ... on Payment {
                id
                transactionId
                amount
                method
                state
                metadata
            }
            ...ErrorResult
            ... on SettlePaymentError {
                paymentErrorMessage
            }
            ... on PaymentStateTransitionError {
                transitionError
            }
            ... on OrderStateTransitionError {
                transitionError
            }
        }
    }
    ${eg}
`,fb=H.gql`
    mutation CreateFulfillment($input: FulfillOrderInput!) {
        addFulfillmentToOrder(input: $input) {
            ...Fulfillment
            ...ErrorResult
        }
    }
    ${cb}
    ${eg}
`,gb=H.gql`
    mutation CancelOrder($input: CancelOrderInput!) {
        cancelOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ub}
    ${eg}
`,mb=H.gql`
    mutation RefundOrder($input: RefundOrderInput!) {
        refundOrder(input: $input) {
            ...Refund
            ...ErrorResult
        }
    }
    ${sb}
    ${eg}
`,yb=H.gql`
    mutation SettleRefund($input: SettleRefundInput!) {
        settleRefund(input: $input) {
            ...Refund
            ...ErrorResult
        }
    }
    ${sb}
    ${eg}
`,bb=H.gql`
    query GetOrderHistory($id: ID!, $options: HistoryEntryListOptions) {
        order(id: $id) {
            id
            history(options: $options) {
                totalItems
                items {
                    id
                    type
                    createdAt
                    isPublic
                    administrator {
                        id
                        firstName
                        lastName
                    }
                    data
                }
            }
        }
    }
`,vb=H.gql`
    mutation AddNoteToOrder($input: AddNoteToOrderInput!) {
        addNoteToOrder(input: $input) {
            id
        }
    }
`,Cb=H.gql`
    mutation UpdateOrderNote($input: UpdateOrderNoteInput!) {
        updateOrderNote(input: $input) {
            id
            data
            isPublic
        }
    }
`,Sb=H.gql`
    mutation DeleteOrderNote($id: ID!) {
        deleteOrderNote(id: $id) {
            result
            message
        }
    }
`,wb=H.gql`
    mutation TransitionOrderToState($id: ID!, $state: String!) {
        transitionOrderToState(id: $id, state: $state) {
            ...Order
            ...ErrorResult
            ... on OrderStateTransitionError {
                transitionError
            }
        }
    }
    ${ob}
    ${eg}
`,_b=H.gql`
    mutation UpdateOrderCustomFields($input: UpdateOrderInput!) {
        setOrderCustomFields(input: $input) {
            ...Order
        }
    }
    ${ob}
`,Ab=H.gql`
    mutation TransitionFulfillmentToState($id: ID!, $state: String!) {
        transitionFulfillmentToState(id: $id, state: $state) {
            ...Fulfillment
            ...ErrorResult
            ... on FulfillmentStateTransitionError {
                transitionError
            }
        }
    }
    ${cb}
    ${eg}
`,Ob=H.gql`
    query GetOrderSummary($start: DateTime!, $end: DateTime!) {
        orders(options: { filter: { orderPlacedAt: { between: { start: $start, end: $end } } } }) {
            totalItems
            items {
                id
                total
                currencyCode
            }
        }
    }
`,xb=H.gql`
    mutation ModifyOrder($input: ModifyOrderInput!) {
        modifyOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ub}
    ${eg}
`,Mb=H.gql`
    mutation AddManualPayment($input: ManualPaymentInput!) {
        addManualPaymentToOrder(input: $input) {
            ...OrderDetail
            ...ErrorResult
        }
    }
    ${ub}
    ${eg}
    fragment Promotion on Promotion {
        id
        createdAt
        updatedAt
        name
        enabled
        couponCode
        perCustomerUsageLimit
        startsAt
        endsAt
        conditions {
            ...ConfigurableOperation
        }
        actions {
            ...ConfigurableOperation
        }
    }
    ${Kf}
`,Ub=H.gql`
    query GetPromotionList($options: PromotionListOptions) {
        promotions(options: $options) {
        }