import { cn } from "@/app/lib/utils";
import Marquee from "@/app/ui/landing-page/magic-ui/marquee";

const reviews = [
  {
    name: "Yvonne",
    username: "Estatic",
    body: "Thanks alot terratinge,was a bit expensive but totally worth it,nice doing business with you",
    img: "https://avatar.vercel.sh/yvonne",
  },
  {
    name: "Laura",
    username: "Grateful",
    body: "Our web application is user-friendly. So thankful to the team!",
    img: "https://avatar.vercel.sh/laura",
  },
  {
    name: "George",
    username: "App Lover",
    body: "Our new app is a work of art. Speedy and visually appealing!",
    img: "https://avatar.vercel.sh/george",
  },
  {
    name: "Steve",
    username: "Thrilled",
    body: "I no longer need to worry about hiring developers and getting bad result,these guys have saved me alot of headache",
    img: "https://avatar.vercel.sh/steve",
  },
  {
    name: "Victor",
    username: "Pleased",
    body: "They built my restaurant app and it really helped my business alot",
    img: "https://avatar.vercel.sh/victor",
  },
  {
    name: "Zach",
    username: "Grateful",
    body: "Can't express enough gratitude to the team. Their expertise in app development is unparalleled.",
    img: "https://avatar.vercel.sh/zach",
  },
  {
    name: "Ian",
    username: "Techie",
    body: "Thank you terra for building us a great app for our business",
    img: "https://avatar.vercel.sh/ian",
  },
  {
    name: "Quincy",
    username: "Delighted",
    body: "The team is top-notch. They transformed our concept into a superb app.",
    img: "https://avatar.vercel.sh/quincy",
  },
  {
    name: "Wendy",
    username: "Content",
    body: "Their team is top-tier.",
    img: "https://avatar.vercel.sh/wendy",
  },
  {
    name: "Hannah",
    username: "Web Fan",
    body: "The web application has been a lifesaver",
    img: "https://avatar.vercel.sh/hannah",
  },
  {
    name: "Xavier",
    username: "Satisfied",
    body: "They've set a new benchmark in app development,very skilled in what they do",
    img: "https://avatar.vercel.sh/xavier",
  },
  {
    name: "Tina",
    username: "Thankful",
    body: "The team's proficiency in app development is unmatched. We're incredibly grateful.",
    img: "https://avatar.vercel.sh/tina",
  },
  {
    name: "Nina",
    username: "Enthusiast",
    body: "Surpassed our expectations. The web application is simply stunning.",
    img: "https://avatar.vercel.sh/nina",
  },
  {
    name: "Kevin",
    username: "Satisfied",
    body: "Remarkable work",
    img: "https://avatar.vercel.sh/kevin",
  },
  {
    name: "Rachel",
    username: "Joyful",
    body: "Collaborating with the team was a joy. They've raised the bar in app development.",
    img: "https://avatar.vercel.sh/rachel",
  },
  {
    name: "Uma",
    username: "Excited",
    body: "love the app they built for me",
    img: "https://avatar.vercel.sh/uma",
  },
  {
    name: "Jane",
    username: "Happy Client",
    body: "The team went above and beyond. The application is flawless.",
    img: "https://avatar.vercel.sh/jane",
  },
  {
    name: "Mike",
    username: "Admirer",
    body: "Excellent job on our app.",
    img: "https://avatar.vercel.sh/mike",
  },
  
  {
    name: "Oscar",
    username: "Appreciative",
    body: "My barshop website looks very good,i love it",
    img: "https://avatar.vercel.sh/oscar",
  },
  {
    name: "Pam",
    username: "Impressed",
    body: "Amazing job!,thanks alot terra team",
    img: "https://avatar.vercel.sh/pam",
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

const Reviews = () => {
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

export default Reviews;
