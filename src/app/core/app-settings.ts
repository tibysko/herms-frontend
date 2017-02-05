export class AppSettings {
   public static API_ENDPOINT: string = 'http://' + window.location.hostname + ':8081/api';
   public static WEBSOCKET_ENDPOINT: string = window.location.hostname + ':8082';
}