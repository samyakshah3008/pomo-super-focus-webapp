import Study1 from "../../../public/tmkoc-theme/study-1.gif";
import Study2 from "../../../public/tmkoc-theme/study-2.gif";
import Study3 from "../../../public/tmkoc-theme/study-3.gif";
import Study4 from "../../../public/tmkoc-theme/study-4.gif";
import Study5 from "../../../public/tmkoc-theme/study-5.gif";
import Study6 from "../../../public/tmkoc-theme/study-6.gif";
import Study7 from "../../../public/tmkoc-theme/study-7.gif";
import Study8 from "../../../public/tmkoc-theme/study-8.gif";
import Study9 from "../../../public/tmkoc-theme/study-9.gif";

import ShortBreak1 from "../../../public/tmkoc-theme/short-break-1.gif";
import ShortBreak2 from "../../../public/tmkoc-theme/short-break-2.gif";

import LongBreak1 from "../../../public/tmkoc-theme/long-break-1.gif";
import LongBreak2 from "../../../public/tmkoc-theme/long-break-2.gif";
import LongBreak3 from "../../../public/tmkoc-theme/long-break-3.gif";
import LongBreak4 from "../../../public/tmkoc-theme/long-break-4.gif";
import LongBreak5 from "../../../public/tmkoc-theme/long-break-5.gif";
import LongBreak6 from "../../../public/tmkoc-theme/long-break-6.gif";
import LongBreak7 from "../../../public/tmkoc-theme/long-break-7.gif";
import LongBreak8 from "../../../public/tmkoc-theme/long-break-8.gif";

import SessionStartedImg from "../../../public/tmkoc-theme/ongoing-pomodoro.webp";
import EscapeSessionImg from "../../../public/tmkoc-theme/reset-pomodoro-modal-img.jpg";

import Award from "../../../public/tmkoc-theme/award-1.gif";

const tmkocTheme: any = {
  study: [
    Study1,
    Study2,
    Study3,
    Study9,
    Study4,
    Study5,
    Study6,
    Study7,
    Study8,
  ],
  shortBreak: [ShortBreak1, ShortBreak2],
  longBreak: [
    LongBreak1,
    LongBreak2,
    LongBreak3,
    LongBreak4,
    LongBreak5,
    LongBreak6,
    LongBreak7,
    LongBreak8,
  ],
  sessionStartModal: {
    img: SessionStartedImg,
    title: "Study Session activated! 🚀",
    headerText: "Bapuji is keeping an eye on you, dare to break it! 💀",
    descriptionText:
      "I wish you all the very best for the session, I'll be reading newspaper while keeping an eye on you, I have trust that you will not break my trust, but dare to break at your own risk ~ Your well wisher bapuji.",
    footerCtaText: "Take bapuji's blessings and start session! 🙇",
  },
  shortBreakModal: {
    youtubeLink:
      "https://www.youtube.com/embed/lcRdF-A5s30?autoplay=1&loop=1&playlist=lcRdF-A5s30",
    title: "Time for a short break! 🚀",
    headerText: "Pura din bas chai chai chai chai!!!",
    descriptionText:
      "Bapuji is out for a walk, will come back as soon as timer ends. Make sure you come back before time!",
    footerCtaText: "Sure, I'll come back!",
  },
  longBreakModal: {
    youtubeLink:
      "https://www.youtube.com/embed/BWAens6gxgw?autoplay=1&loop=1&playlist=BWAens6gxgw",
    title: "Time for a long break! 🚀",
    headerText: "Recharge yourself now!",
    descriptionText:
      "Bapuji is off to mandir, will come back as soon as timer ends. Do make sure to come back before timer ends;)",
    footerCtaText: "Sure, I'll come back!",
  },
  escapeModal: {
    img: EscapeSessionImg,
    title: "Are you trying to escape?",
    headerText: "Tu kahin nahi jayega beth ja chup chap! Shhhhhhh!",
    descriptionText:
      "Akal vagar no dhandho, (please note if you have any emergency, you can click on the reset button to take a break.)",
    footerCtaText: "Sorry bapuji, I am studying now. ",
  },
  resetSessionModal: {
    youtubeLink:
      "https://www.youtube.com/embed/hLxMW2k8wyY?autoplay=1&loop=1&playlist=hLxMW2k8wyY",
    title: "Reset session?",
    headerText: "Gogi ko bula gogi ko 💀",
    descriptionText:
      "Sodhi ko bulana he, abdul ko bula na he, khud ko koi kaam karna hi nahi he, babuchak, akal vagar no dhandho kahi ko. La me padh leta hun tumhare badle, la me padhta hun.",
    footerCtaText: "I really want to take break",
    footerSecondaryText: "Take bapuji's blessings and back to study 🙇",
  },
  pauseSessionModal: {
    img: Study6,
    title: "Session paused!",
    headerText: "E charbi! haan tujhe hi bol raha! kahan ja rahe?",
    descriptionText:
      "Agar tu jaldi vapis nahi aya to is ghar me tumhe ghusne nahi dunga babuchak! ~ bapuji",
    footerCtaText: "Sure, I'll come back soon!",
  },
  congratulationsModal: {
    img: Award,
    title: "Congratulations!",
    headerText: "You did it! Here is your trophy!",
    descriptionText:
      "Bas ese hi mehnat karta reh mera jethiya, ek din gada khandan ka name jaror roshan karega tu! ~ bapuji",
    footerCtaText: "Take bapuji's blessings and continue 🙇",
  },
  exitModal: {
    youtubeLink:
      "https://www.youtube.com/embed/2iEWRxltstM?autoplay=1&loop=1&playlist=2iEWRxltstM",
    title: "Before you go! 💀",
    headerText: "Fulta ja raha he aur felta ja raha he!",
    descriptionText:
      "Roz subah uthke tu 30min kasrat karega varna tu ghar se bahar! ~ bapuji",
    footerCtaText: "Take bapuji's blessings and exit 🙇",
  },
};

export { tmkocTheme };
