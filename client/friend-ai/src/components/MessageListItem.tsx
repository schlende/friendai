import {
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { Message } from "../data/messages";
import "./MessageListItem.css";
import { IonRippleEffect } from "@ionic/react";

interface MessageListItemProps {
  message: Message;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <IonItem
      id="message-list-item"
      routerLink={`/message/${message.id}`}
      detail={false}
    >
      <IonCard>
        <img
          alt="Silhouette of mountains"
          src="https://ionicframework.com/docs/img/demos/card-media.png"
        />
        <IonCardHeader>
          <IonCardTitle color="primary">Music in the park</IonCardTitle>
          <IonCardSubtitle>This Sunday, 3:00pm</IonCardSubtitle>
        </IonCardHeader>

        <IonCardContent>
          Forest likes outdoor music, he may enjoy this festival
        </IonCardContent>
        <IonButton fill="outline" shape="round" color="primary">
          Let's do this!
          <IonRippleEffect />
        </IonButton>
      </IonCard>
    </IonItem>
  );
};

export default MessageListItem;
