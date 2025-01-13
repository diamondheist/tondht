// pages/about.jsx
const About = () => {
  return (
    <div className="p-2">
     <div className="mt-2 text-sm leading-7 text-white-200 backdrop-blur-xl p-2 ">
        <h1 className="font-bold text-2xl text-blue-600">▎Welcome to Diamond Heist:</h1>
        <span className="font-semibold block text-l text-indigo-700 mt-2">
          Your Ultimate Crypto Mining Adventure!
        </span>
        <div className="block mt-2 text-gray-300">
          <strong className="text-indigo-600">Project Overview: </strong>
          Prepare for the thrill of a lifetime with Diamond Heist, the most exciting Telegram mini app mining project set to take the crypto world by storm! 
          With our innovative approach, you’ll dive into a captivating experience that combines gaming and cryptocurrency, all while earning valuable
          <span className="font-medium text-blue-700"> $DHT (Diamond Heist Tokens)</span>. 
          With a total supply of <strong>50,000,000 $DHT</strong>, this project is poised to be the biggest talk of the season!
        </div>

        <div className="block mt-4">
          <strong className="text-green-600">How to Earn $DHT Tokens:</strong>
          <ol className="list-decimal list-inside mt-2">
            <li>
              <span className="font-medium">Complete Referrals:</span> Refer at least <strong>10 friends</strong> to join the Diamond Heist community and unlock exclusive rewards.
            </li>
            <li>
              <span className="font-medium">Rent a Mining Machine:</span> Boost your hash rate to earn more $DHT tokens and maximize your mining potential.
            </li>
            <li>
              <span className="font-medium">Daily Tasks:</span> Engage with rewarding daily tasks to accumulate even more tokens.
            </li>
          </ol>
        </div>

        <div className="block mt-4">
          <strong className="text-purple-400">The Future of Diamond Heist: </strong>
          Limited token supply and backing from major industry players (details coming soon) make this a project with immense potential. As demand for $DHT grows, so will its value!
        </div>

        <div className="block mt-4 text-green-400">
          <strong>Early Bird Rewards:</strong> Join early and earn <strong>500 $DHT tokens</strong> as one of the first 10,000 users!
        </div>

        <div className="block mt-4">
          <strong className="text-yellow-600">Why Choose Diamond Heist?</strong>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Innovative Mining Experience: A unique blend of gaming and crypto mining.</li>
            <li>Community Engagement: Be part of a vibrant and active community.</li>
            <li>Referral Incentives: Earn big rewards through our referral program.</li>
            <li>Strong Backing: Partnerships with leading crypto companies for guaranteed success.</li>
          </ul>
        </div>

        <div className="block mt-6 text-indigo-400">
          Don’t wait—join the Diamond Heist revolution today! Claim your early bird reward, refer friends, and uncover the treasures of the crypto world.
        </div>
      </div>
    </div>
  );
};

export default About;
