import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { AuthService } from './auth.service';
import { OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnInit{
  messaging: any;

  constructor(private authService: AuthService) {
    const app = initializeApp(environment.firebaseConfig);
    this.messaging = getMessaging(app);
  }

  async ngOnInit(){
  }

  async requestPermissionAndGetToken(): Promise<string | null> {
    const permission = await Notification.requestPermission();
    
    if (permission === 'granted') {
      try {
        const token = await getToken(this.messaging, {
          vapidKey: 'BKKIrgMm3FW8wZFJc12abbKGm2smvU-RQ5f7cMLo1IKmJneEodb1Eemhp93BFWflaQfN4MdzBV780QU1Fk8ZrLA',
        });
        console.log('FCM token:', token);
        return token;
      } catch (err) {
        console.error('Error getting token', err);
        return null;
      }
    } else {
      console.warn('Permission not granted');
      return null;
    }
  }



  listenForMessages() {
    onMessage(this.messaging, (payload) => {
      console.log('Message received. ', payload);
      alert(payload.notification?.title + '\n' + payload.notification?.body);
    });
  }


}
