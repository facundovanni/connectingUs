angular.module("app")
.constant("adalSettings", {
  "instance": "https://login.microsoftonline.com/",
  "tenant": "F208DE0F-2C7B-43A4-AC97-E7C933B120A4",
  "clientId": "F4A0BB6E-4BFC-4C12-A097-FE79E0551123",
  "aadEndpoints": {
    "https://mycoolapi.azurewebsites.net": "https://mycoolapi-app-id"
  }
})
.constant("appSettings", {
  "apiEndPoint": "https://mycoolapi.azurewebsites.net/api"
});