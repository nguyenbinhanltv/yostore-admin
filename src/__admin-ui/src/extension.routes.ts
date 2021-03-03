export const extensionRoutes = [  {
    path: 'extensions/webhook',
    loadChildren: () => import('./extensions/0f0bb66a01213486cf3aa947e4690d963a1e6a51840ebc3d68b232c7cf6518da/webhook.module').then(m => m.WebhookModule),
  }];
