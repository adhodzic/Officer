const jwt = require('jsonwebtoken');
const docusign = require('docusign-esign');
const {dsConfig} = require('./dsConfig')

module.exports = class DSToken {
    constructor(){
        this.token = null
    }

    async getToken(){
        if(this.token != null) return this.token;
        await this.initToken();
        return this.token;
    }

    async initToken(){
        const dsApiClient = new docusign.ApiClient({basePath: dsConfig.dsApiBasePath});

        try{
            const response = await dsApiClient.requestJWTUserToken(dsConfig.integratorKey, dsConfig.userId,['signature impersonation'],dsConfig.privateKey, 3600)
            this.token = response.body.access_token
        }catch(err){
            console.log(err)
        }
    }
}
