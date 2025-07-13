import { FaTwitch, FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";

export const navItems = [
  { name: "Nexus", target: "nexus" },
  { name: "About", target: "about" },
  { name: "Features", target: "features" },
  { name: "Prologue", target: "prologue" },
  { name: "Contact", target: "contact" },
];

export const navCollapseDuration = 125;

export const audioButtonLines = [1, 2, 3, 4];

export const featuresData = [
  {
    id: 0,
    src: "videos/feature-1.mp4",
    title: (
      <>
        radi<b>a</b>nt
      </>
    ),
    description:
      "A cross-platform metagame app, turning your activities across Web2 and Web3 games into a rewarding adventure.",
  },
  {
    id: 1,
    src: "videos/feature-2.mp4",
    title: (
      <>
        zig<b>m</b>a
      </>
    ),
    description:
      "An anime and gaming-inspired NFT collection—the IP primed for expansion.",
  },
  {
    id: 2,
    src: "videos/feature-3.mp4",
    title: (
      <>
        n<b>e</b>xus
      </>
    ),
    description:
      "A gamified social hub, adding a new dimension of play to social interaction for Web3 communities.",
  },
  {
    id: 3,
    src: "videos/feature-4.mp4",
    title: (
      <>
        az<b>u</b>l
      </>
    ),
    description:
      "A cross-world AI Agent—elevating your gameplay to be more fun and productive.",
  },
];

export const galleryImg = [];
for (let i = 1; i <= 5; i++) {
  galleryImg.push({
    src: `./img/gallery-${i}.webp`,
    alt: `gallery image ${i}`,
  });
}

export const footerLinks = [
  { href: "https://discord.com", icon: <FaDiscord />, name: "Discord" },
  { href: "https://twitter.com", icon: <FaTwitter />, name: "Twitter" },
  { href: "https://github.com", icon: <FaGithub />, name: "Github" },
  { href: "https://twitch.tv", icon: <FaTwitch />, name: "Twitch" },
];
