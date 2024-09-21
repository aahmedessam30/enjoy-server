import base64 from 'base64-js';
import request from 'request';

class SMSClient {
    app_id: string;
    app_sec: string;
    base_url: string;
    app_hash: string;
    constructor(app_id: string, app_sec: string) {
        this.app_id = app_id;
        this.app_sec = app_sec;
        this.base_url = "https://api-sms.4jawaly.com/api/v1/";
        this.app_hash = base64.fromByteArray(Buffer.from(`${app_id}:${app_sec}`)).toString();
    }

    sendMessage(text: string, numbers: string[], sender: string) {
        let messages = { messages: [{ text, numbers: numbers, sender, number_iso: "SA" }] };
        let headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "app_key": this.app_id,
            "app_secret": this.app_sec,
        }
        let url = `${this.base_url}account/area/sms/send`;
        return new Promise((resolve, reject) => {
            request.post({ url, headers, json: messages }, (error, response, body) => {
                if (error) reject(error);
                else resolve(body);
            });
        });
    }
}

export default SMSClient;