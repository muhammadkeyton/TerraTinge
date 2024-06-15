import { cn } from "@/app/lib/utils";
import Marquee from "@/app/ui/landing-page/magic-ui/marquee";

const reviews = [
    {
      name: "Alice",
      username: "Innovative Thinkers",
      body: "Wow! The mobile app TerraTinge created for us is simply outstanding! It's user-friendly and visually appealing. I'm absolutely delighted!",
      img: "https://avatar.vercel.sh/alice",
    },
    {
      name: "Bob",
      username: "Eco Enthusiasts",
      body: "I'm genuinely impressed with the web application TerraTinge developed for us. It's reliable, intuitive, and has significantly simplified our lives. Hats off to the team!",
      img: "https://avatar.vercel.sh/bob",
    },
    {
      name: "Charlie",
      username: "Health Advocates",
      body: "TerraTinge transformed our vision into reality! Our new app exceeds our expectations. Kudos to their exceptional team!",
      img: "https://avatar.vercel.sh/charlie",
    },
    {
      name: "Diana",
      username: "Foodie Friends",
      body: "Collaborating with TerraTinge has been a wonderful experience. They've raised the bar in app development. I couldn't be more satisfied with the results!",
      img: "https://avatar.vercel.sh/diana",
    },
    {
      name: "Ethan",
      username: "Travel Trailblazers",
      body: "The web app TerraTinge developed for us has been a game-changer. It's streamlined our operations and enabled us to reach a wider audience. We're ecstatic!",
      img: "https://avatar.vercel.sh/ethan",
    },
    {
      name: "Fiona",
      username: "Fitness Fanatics",
      body: "I can't praise TerraTinge enough. Their app development expertise is unparalleled, and they've helped us engage with our customers in a whole new way. We're incredibly thankful!",
      img: "https://avatar.vercel.sh/fiona",
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
    
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-black"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-black"></div>


    </div>
    </>
  );
};

export default MarqueeDemo;
