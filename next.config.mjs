/** @type {import('next').NextConfig} */
const nextConfig = {
    
   
    //allows us to use remote images in this case we are making use of vercel's random images or google user image
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'avatar.vercel.sh',
            port: '',
          },

          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
          }
        ],
      },
};

export default nextConfig;
