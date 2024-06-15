import { cn } from "@/app/lib/utils";
import Marquee from "@/app/ui/landing-page/magic-ui/marquee";

const reviews = [
  {
    name: "George",
    username: "App Lover",
    body: "The app that TerraTinge built for us is a masterpiece. It's fast and looks great!",
    img: "https://avatar.vercel.sh/george",
  },
  {
    name: "Hannah",
    username: "Web Fan",
    body: "Our new web app, developed by TerraTinge, is a lifesaver. It's so easy to use.",
    img: "https://avatar.vercel.sh/hannah",
  },
  {
    name: "Ian",
    username: "Techie",
    body: "The mobile app TerraTinge developed for us is sleek and efficient. A real game-changer.",
    img: "https://avatar.vercel.sh/ian",
  },
  {
    name: "Jane",
    username: "Happy Client",
    body: "TerraTinge delivered beyond our expectations. The app they built for us is just perfect.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Kevin",
    username: "Satisfied",
    body: "Impressive work by TerraTinge. The app they developed for us is user-friendly and reliable.",
    img: "https://avatar.vercel.sh/kevin",
  },
  {
    name: "Laura",
    username: "Grateful",
    body: "Our web app, developed by TerraTinge, is intuitive and robust. So grateful!",
    img: "https://avatar.vercel.sh/laura",
  },
  {
    name: "Mike",
    username: "Admirer",
    body: "TerraTinge did a fantastic job on our app. It's beautiful and efficient.",
    img: "https://avatar.vercel.sh/mike",
  },
  {
    name: "Nina",
    username: "Enthusiast",
    body: "TerraTinge exceeded our expectations. The web app they built for us is just amazing.",
    img: "https://avatar.vercel.sh/nina",
  },
  {
    name: "Oscar",
    username: "Appreciative",
    body: "The app that TerraTinge built for us is simply outstanding. It's a joy to use.",
    img: "https://avatar.vercel.sh/oscar",
  },
  {
    name: "Pam",
    username: "Impressed",
    body: "The mobile app TerraTinge developed for us is visually appealing and super efficient.",
    img: "https://avatar.vercel.sh/pam",
  },
  {
    name: "Quincy",
    username: "Delighted",
    body: "TerraTinge's team is exceptional. They turned our vision into a fantastic app.",
    img: "https://avatar.vercel.sh/quincy",
  },
  {
    name: "Rachel",
    username: "Joyful",
    body: "Working with TerraTinge was a pleasure. They've set a new standard in app development.",
    img: "https://avatar.vercel.sh/rachel",
  },
  {
    name: "Steve",
    username: "Thrilled",
    body: "The web app TerraTinge developed for us has revolutionized our operations. It's streamlined and effective.",
    img: "https://avatar.vercel.sh/steve",
  },
  {
    name: "Tina",
    username: "Thankful",
    body: "TerraTinge's expertise in app development is unparalleled. We're incredibly thankful for the app they built for us.",
    img: "https://avatar.vercel.sh/tina",
  },
  {
    name: "Uma",
    username: "Excited",
    body: "The app that TerraTinge built for us is amazing! It's user-friendly and looks stunning.",
    img: "https://avatar.vercel.sh/uma",
  },
  {
    name: "Victor",
    username: "Pleased",
    body: "The web app by TerraTinge is reliable and intuitive. It's made our work easier.",
    img: "https://avatar.vercel.sh/victor",
  },
  {
    name: "Wendy",
    username: "Content",
    body: "TerraTinge turned our idea into a fantastic app. Their team is exceptional.",
    img: "https://avatar.vercel.sh/wendy",
  },
  {
    name: "Xavier",
    username: "Satisfied",
    body: "Working with TerraTinge was a great experience. They've set a new standard in app development.",
    img: "https://avatar.vercel.sh/xavier",
  },
  {
    name: "Yvonne",
    username: "Estatic",
    body: "The web app TerraTinge developed for us has been a game-changer. It's streamlined and effective.",
    img: "https://avatar.vercel.sh/yvonne",
  },
  {
    name: "Zach",
    username: "Grateful",
    body: "Can't thank TerraTinge enough. Their expertise in app development is top-notch.",
    img: "https://avatar.vercel.sh/zach",
  },
];

  
const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

const MarqueeDemo = () => {
  return (
    <>


    <h2 className="mb-4 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-foreground my-12">
          What Our Clients Are Saying
    </h2>
    <h3 className="mx-auto mb-8 max-w-lg text-balance text-center text-lg font-medium tracking-tight text-foreground/80">
        Here&apos;s what{" "}
        <strong>Our Happy Clients</strong> are saying about Us .
    </h3>
    
    
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-background py-12 ">
    
      <Marquee pauseOnHover className="[--duration:80s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:80s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className=" pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
      <div className=" pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-black"></div>


    </div>
    </>
  );
};

export default MarqueeDemo;
