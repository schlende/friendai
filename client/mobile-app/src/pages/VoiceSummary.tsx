import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const dummyIntroCall = `Good morning Dave! Here are a few ways to deepen your connections today:
Send Alex a quick message—you haven’t caught up in months. A simple “Hey, how’s life? Miss our chats!” can go a long way.
Check in on Sarah’s job search—she mentioned it last time, and a “How’s the hunt going? Anything I can do to help?” shows you care.
Shoot James a LinkedIn message—he recently started a new role. Congratulate him and ask how it’s going!
Text your cousin Emma—she just had a baby. A thoughtful “Hope you’re hanging in there! Let me know if you need anything.” will mean a lot.
Plan a call with Mom or Dad—even just 10 minutes to ask about their week can make their day.
Drop a compliment in a group chat—something as small as “Chris, that playlist you made is awesome!” sparks good vibes.
React to an old friend’s social post—commenting on Lisa’s travel photos with “Looks amazing! Where was your favorite spot?” can revive a conversation.
Thank Mark for his advice last month—“By the way, your suggestion really helped—I appreciate it!” keeps relationships strong.
Set a reminder to plan dinner with Jessica—even if it’s next week, locking it in keeps friendships alive.
Tell your spouse one thing you love about them today—just a simple “I really appreciate how supportive you are.”
Who’s first on your list today?`;

export const VoiceSummary = () => {
  useEffect(() => {
    const speak = () => {
      const utterance = new SpeechSynthesisUtterance(dummyIntroCall);
      utterance.voice = speechSynthesis.getVoices()[1]; // Choose a voice
      speechSynthesis.speak(utterance);
    };

    speak();
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const navigate = useNavigate();
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "300%",
            height: "100%",
          }}
        >
          <source src="/src/assets/wave-form-final.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(105.81deg, #F9C1FF 14.82%, #6CFFF6 80.65%)",
            mixBlendMode: "lighten",
            pointerEvents: "none",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "40px",
          gap: "20px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src="/src/assets/friend-ai-logo.svg"
          alt="Friend AI Logo"
          style={{ width: "100px", height: "100px" }}
        />
        <div
          style={{
            color: "black",
            fontWeight: 800,
            fontSize: "48px",
            lineHeight: "50px",
          }}
        >
          Daily Summary
        </div>
        <div
          style={{
            color: "black",
            fontWeight: 600,
            width: "60%",
            fontSize: "18px",
          }}
        >
          From your personal friendship assistant
        </div>
        <div>
          <button
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.5)",
              color: "black",
              padding: "10px 20px",
              borderRadius: "40px",
              height: "50px",
              width: "150px",
              border: "1.5px solid",
              borderImage: "none",
              borderColor:
                "linear-gradient(105.81deg, #F9C1FF 14.82%, #6CFFF6 80.65%)",
            }}
            onClick={() => navigate("/")}
          >
            My Friends
          </button>
        </div>
      </div>
    </div>
  );
};
