// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_ENDPOINT : 'http://localhost:54259',
  LDAP_API_ENDPOINT : 'https://lan.api.saint-gobain.com/sgdsi/groupdirectory/v3/users/',
  LDAP_API_KEY:'c3c1ab51-993c-40ab-81ae-8113b69a16a3'

};
