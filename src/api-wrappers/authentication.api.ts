import * as rp from "request-promise";
import { CommonApi } from "./common.api";

export class AuthenticationApi {
    private static readonly ENDPOINT = "/authentication";
    private static readonly LOGIN_ENDPOINT = "/login";
    private static readonly LOGOUT_ENDPOINT = "/logout";
    
    // this should be moved to the profile API
    private static readonly WHO_AM_I = "/whoami";

    /**
     * Logins the user into epm
     * This will return a token at some point which will be stored
     * in the users files to authenticate for a certain amount of time
     * @param username The username
     * @param password The password
     */
    public async login(username: string, password: string): Promise<void> {
        const options = {
            method: 'POST',
            uri: this.loginEndPoint,
            body: {
                username,
                password
            }
        }

        await rp.post(options);
    }

    /**
     * Logs the user out
     */
    public async logout(): Promise<void> {
        // probably should invalidate the token
        // this for now may just delete the token
        // which is stored in the users files
        // so may not need a API call
    }

    /**
     * Builds login endpoint 
     */
    private get loginEndPoint(): string {
        const endpointPath = `${AuthenticationApi.ENDPOINT}${AuthenticationApi.LOGIN_ENDPOINT}`;
        return CommonApi.buildApiUrlEndpoint(endpointPath);
    }
}