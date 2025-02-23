import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonRippleEffect,
} from "@ionic/react";
import "./Home.css";
import { useHistory } from "react-router-dom";
import { iceCream } from "ionicons/icons";

const Home: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage id="home-page">
      <IonContent fullscreen>
        {/* let's add the friend-ai-logo.svg from the public folder here */}
        <div style={{ paddingTop: "40px", paddingInline: "30px" }}>
          <img
            src="/friend-ai-logo.svg"
            alt="Friend AI"
            className="friend-ai-logo"
          />
        </div>

        <img
          src="/my-circles-image.png"
          alt="My Circles"
          className="my-circles-image"
        />
        <div style={{ paddingInline: "20px" }}>
          <IonCard>
            <IonCardHeader>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ paddingRight: "10px" }}>
                  <IonAvatar style={{ height: "43px", width: "43px" }}>
                    <img
                      alt="Silhouette of a person's head"
                      src="https://ionicframework.com/docs/img/demos/avatar.svg"
                    />
                  </IonAvatar>
                </div>
                <IonLabel>
                  You met Forest last week while walking your dog. Want to hang
                  out again soon?
                </IonLabel>
              </div>
            </IonCardHeader>
            <IonCardContent>
              <div className="button-container">
                <IonButton
                  fill="outline"
                  shape="round"
                  size="large"
                  onClick={() => {
                    history.push("/view-recommendations");
                  }}
                >
                  Dismiss
                  <IonRippleEffect />
                </IonButton>
                <IonButton
                  shape="round"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    history.push("/view-recommendations");
                  }}
                >
                  <IonIcon slot="start" icon={iceCream} color="tertiary" />
                  Arrange
                  <IonRippleEffect />
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
