"use client";
import Confetti from "react-confetti";
import { useRef } from "react";
import { Music, Pause } from "lucide-react";
import { useEffect, useState } from "react";
import { Lock, Gift, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PASSWORD = "LOVE";

export default function Home() {
const [openedCard, setOpenedCard] = useState<number | null>(null);  
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
const [showHiddenMessage, setShowHiddenMessage] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
const [showConfetti, setShowConfetti] = useState(false);
const [showSecret, setShowSecret] = useState(false);
const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
const audioRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    const stored = sessionStorage.getItem("abigail-birthday-unlocked");

    if (stored === "true") {
      setUnlocked(true);
      setShowWelcome(true);
    }
  }, []);

  const toggleMusic = async () => {
  if (!audioRef.current) {
    alert("Audio not found");
    return;
  }

  try {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  } catch (error) {
    console.log(error);
    alert("Music failed to play");
  }
};


  const handleSubmit = () => {
    if (password.trim().toUpperCase() === PASSWORD) {
      sessionStorage.setItem("abigail-birthday-unlocked", "true");

      setError("");
      setUnlocked(true);

      setTimeout(() => {
        setShowWelcome(true);
      }, 1500);

      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    setShake(true);

    setTimeout(() => {
      setShake(false);
    }, 500);

    if (newAttempts === 1) {
      setError("Hmm... that's not it. Are you sure you're the birthday girl?");
    }

    if (newAttempts === 2) {
      setError("Still not correct. I promise the password isn't your name 😏");
    }

    if (newAttempts >= 3) {
      setShowHint(true);
      setError(
        "Okay, okay... Since it's your birthday, here's a little help ❤️"
      );
    }
  };

  if (!unlocked) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6">
       
        {showConfetti && <Confetti />}
        <audio
  ref={audioRef}
  loop
  preload="auto"
>
  <source src="/music.mp3" type="audio/mpeg" />
  </audio>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: 1,
            y: 0,
            x: shake ? [-10, 10, -8, 8, -4, 4, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-10 text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#C8A96A]/10 p-5 rounded-full">
              <Gift className="w-10 h-10 text-[#C8A96A]" />
            </div>
          </div>

          <h1 className="text-4xl font-serif text-gray-800 mb-4">
            A Gift Has Been Found 🎁
          </h1>

          <p className="text-gray-600 leading-relaxed mb-8">
            It seems someone left a birthday gift here for a very special girl.
            <br />
            <br />
            Unfortunately, access is restricted to curious visitors.
          </p>

          <div className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />

              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSubmit();
                }}
                className="w-full pl-12 pr-4 py-4 border rounded-xl outline-none focus:border-[#C8A96A]"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-[#C8A96A] hover:bg-[#b99859] text-white py-4 rounded-xl transition-all"
            >
              Unlock My Gift
            </button>
          </div>
                    {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}
          {showHint && (
  <div className="mt-4 p-4 bg-[#C8A96A]/10 rounded-xl">
    <p className="text-[#C8A96A] font-medium">
      Hint: What is the one thing this entire website was built with? ❤️
    </p>
  </div>
)}

        </motion.div>
      </main>
    );
  }

  if (!showWelcome) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <Gift className="w-20 h-20 text-[#C8A96A] mx-auto mb-6" />

          <h1 className="text-4xl font-serif text-gray-800">
            Access Granted
          </h1>

          <p className="text-gray-600 mt-4">
            Preparing your surprise...
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="bg-[#FAF9F6]">
<button
  onClick={toggleMusic}
  className="
    fixed
    bottom-6
    right-6
    z-50
    bg-white
    shadow-xl
    rounded-full
    w-14
    h-14
    flex
    items-center
    justify-center
    hover:scale-110
    transition
  "
>
  {isPlaying ? (
    <Pause className="text-[#C8A96A]" />
  ) : (
    <Music className="text-[#C8A96A]" />
  )}
</button>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 2 }}
  className="mt-8"
>
  <button
    onClick={toggleMusic}
    className="
      px-6
      py-3
      rounded-full
      bg-[#C8A96A]
      text-white
    "
  >
    🎵 Play Music Before We Begin
  </button>
</motion.div>
      {/* WELCOME SCREEN */}

      <section className="min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center max-w-3xl"
        >
          <Heart
            className="w-16 h-16 text-[#C8A96A] mx-auto mb-8"
            fill="#C8A96A"
          />

          <h1 className="text-5xl md:text-7xl font-serif text-gray-800 mb-8">
            Welcome, Abigail ❤️
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed">
            I've been waiting for you.
          </p>

          <p className="text-xl text-gray-600 leading-relaxed mt-6">
            Before we begin...
          </p>

          <p className="text-2xl text-[#C8A96A] font-medium mt-6">
            Put on your smile.
          </p>

          <p className="text-xl text-gray-600 leading-relaxed mt-8">
            You're about to walk through a little corner of my heart.
          </p>
          <p className="mt-10 text-gray-500 italic">
  ❤️ This little journey will take about 5 minutes.
  Take your time, smile, and enjoy every page.
</p>
          <motion.a
            href="#hero"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mt-12 bg-[#C8A96A] text-white px-8 py-4 rounded-full"
          >
            Begin The Journey →
          </motion.a>
        </motion.div>
        
      </section>

      {/* HERO SECTION */}

      <section
        id="hero"
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="uppercase tracking-[8px] text-[#C8A96A] mb-6"
          >
            Happy Birthday
          </motion.p>
<audio
  ref={audioRef}
  loop
  preload="auto"
>
  <source src="/music.mp3" type="audio/mpeg" />
</audio>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-serif text-gray-800"
          >
            Abigail
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-10 text-xl text-gray-600 max-w-3xl mx-auto leading-loose"
          >
            Today is not simply a celebration of your birthday.
            <br />
            It is a celebration of your life.
            <br />
            Your smile.
            <br />
            Your strength.
            <br />
            Your heart.
            <br />
            And every beautiful thing that makes you who you are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              alt="Abigail"
              className="w-80 h-80 object-cover rounded-full mx-auto shadow-2xl"
            />
          </motion.div>
        </div>
      </section>
      {/* LETTER SECTION */}

<section className="py-32 px-6 bg-white">
  <div className="max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-5xl font-serif text-gray-800 mb-6">
        A Letter To You
      </h2>

      <div className="w-24 h-1 bg-[#C8A96A] mx-auto" />
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-[#FAF9F6] p-10 md:p-16 rounded-3xl shadow-sm"
    >
      <p className="text-lg leading-loose text-gray-700">
        Dear Abigail,
      </p>

      <p className="mt-8 text-lg leading-loose text-gray-700">
        Today, the world celebrates the day you were born.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        But for me, it's more than a birthday.
        It's a reminder that somewhere along life's journey,
        God allowed our paths to cross and I became fortunate
        enough to know someone as special as you.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        You have a way of bringing warmth into moments,
        laughter into conversations,
        and beauty into ordinary days.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        As you turn twenty-four today,
        I pray this year becomes one of growth,
        peace, answered prayers,
        beautiful surprises,
        and unforgettable joy.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        Thank you for being you.
      </p>

      <p className="mt-10 text-xl text-[#C8A96A] font-medium">
        — Samuel ❤️
      </p>
    </motion.div>
  </div>
</section>

{/* OUR JOURNEY */}

<section className="py-32 px-6">
  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        Our Journey
      </h2>

      <p className="mt-6 text-gray-600">
        A few moments that deserve to be remembered.
      </p>
    </motion.div>

    <div className="space-y-10">
      {[
        {
          title: "The Beginning",
          text: "The day our paths crossed and a story quietly began.",
        },
        {
          title: "The Conversations",
          text: "The moments we talked, laughed, and got to know each other better.",
        },
        {
          title: "The Memories",
          text: "The little moments that became meaningful memories.",
        },
        {
          title: "Today",
          text: "A beautiful woman celebrating her 24th birthday.",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex gap-6 items-start"
        >
          <div className="w-12 h-12 rounded-full bg-[#C8A96A] text-white flex items-center justify-center font-bold">
            {index + 1}
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm flex-1">
            <h3 className="text-2xl font-semibold text-gray-800">
              {item.title}
            </h3>

            <p className="mt-3 text-gray-600">
              {item.text}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* WHAT I ADMIRE ABOUT YOU */}

<section className="py-32 px-6 bg-white">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        What I Admire About You
      </h2>

      <p className="mt-6 text-gray-600">
        Just a few things that make you special.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          title: "Your Heart",
          text: "The kindness and warmth you carry with you.",
        },
        {
          title: "Your Strength",
          text: "The way you keep moving forward despite challenges.",
        },
        {
          title: "Your Smile",
          text: "A smile capable of brightening an entire day.",
        },
        {
          title: "Your Determination",
          text: "The drive you have to become better.",
        },
        {
          title: "Your Presence",
          text: "The calm and comfort your presence can bring.",
        },
        {
          title: "Your Uniqueness",
          text: "There is only one Abigail, and that's beautiful.",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#FAF9F6] p-8 rounded-3xl"
        >
          <Heart
            className="w-8 h-8 text-[#C8A96A] mb-4"
            fill="#C8A96A"
          />

          <h3 className="text-2xl font-semibold text-gray-800">
            {item.title}
          </h3>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* THINGS YOU NEVER KNEW */}

<section className="py-32 px-6">
  <div className="max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        Things You Never Knew
      </h2>

      <p className="mt-6 text-gray-600">
        A few thoughts I've kept in my heart.
      </p>
    </motion.div>

    <div className="space-y-8">
      {[
        "You probably don't know how many times you've made me smile without even trying.",
        "You probably don't know how much I appreciate our conversations.",
        "You probably don't know how proud I am whenever I see you making progress.",
        "You probably don't know how often I thank God for your life.",
        "You probably don't know how much happiness your happiness brings me.",
      ].map((text, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white p-8 rounded-3xl shadow-sm"
        >
          <p className="text-lg text-gray-700 leading-loose">
            {text}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>
{/* 24 REASONS YOU'RE SPECIAL */}

<section className="py-32 px-6 bg-white">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        24 Reasons You're Special
      </h2>

      <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
        Twenty-four reasons for twenty-four beautiful years.
        Click any card to reveal what's inside.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[
  { number: 1, image: "/photo1.jpg", reason: "Your smile has a way of making difficult days feel lighter." },
  { number: 2, image: "/photo2.jpg", reason: "You care deeply about the people you love." },
  { number: 3, image: "/photo3.jpg", reason: "You are stronger than you give yourself credit for." },
  { number: 4, image: "/photo4.jpg", reason: "You have a beautiful heart." },
  { number: 5, image: "/photo5.jpg", reason: "Your laughter is genuinely contagious." },

  { number: 6, image: "/photo1.jpg", reason: "You continue to grow through life's challenges." },
  { number: 7, image: "/photo2.jpg", reason: "You make ordinary conversations feel meaningful." },
  { number: 8, image: "/photo3.jpg", reason: "You bring warmth wherever you go." },
  { number: 9, image: "/photo4.jpg", reason: "You inspire people more than you realize." },
  { number: 10, image: "/photo5.jpg", reason: "You remain yourself in a world that often pressures people to change." },

  { number: 11, image: "/photo1.jpg", reason: "Your kindness leaves a lasting impact." },
  { number: 12, image: "/photo2.jpg", reason: "You possess quiet strength." },
  { number: 13, image: "/photo3.jpg", reason: "You make beautiful memories without even trying." },
  { number: 14, image: "/photo4.jpg", reason: "You are worth celebrating today and every day." },
  { number: 15, image: "/photo5.jpg", reason: "Your future is full of possibilities." },

  { number: 16, image: "/photo1.jpg", reason: "You never stop learning and improving." },
  { number: 17, image: "/photo2.jpg", reason: "You make life a little brighter." },
  { number: 18, image: "/photo3.jpg", reason: "You have a beautiful way of seeing the world." },
  { number: 19, image: "/photo4.jpg", reason: "You deserve every good thing coming your way." },
  { number: 20, image: "/photo5.jpg", reason: "You are wonderfully unique." },

  { number: 21, image: "/photo1.jpg", reason: "You remind people that kindness still exists." },
  { number: 22, image: "/photo2.jpg", reason: "You make people feel valued." },
  { number: 23, image: "/photo3.jpg", reason: "You are a gift to the people who know you." },
  { number: 24, image: "/photo4.jpg", reason: "Because you're Abigail — and that's more than enough. ❤️" },
      ].map((item) => (
        <motion.div
  key={item.number}
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{ y: -8 }}
  onClick={() =>
    setOpenedCard(
      openedCard === item.number ? null : item.number
    )
  }
  className="cursor-pointer"
>
  <div className="bg-[#FAF9F6] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 min-h-[250px]">

    {openedCard === item.number ? (
      <>
        <img
          src={item.image}
          alt={`Photo ${item.number}`}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 text-center">
          <p className="text-gray-700 leading-relaxed">
            {item.reason}
          </p>
        </div>
      </>
    ) : (
      <div className="p-8 h-full flex flex-col justify-center items-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#C8A96A] text-white flex items-center justify-center text-2xl font-bold mb-6">
          {item.number}
        </div>

        <Heart
          className="w-6 h-6 text-[#C8A96A] mb-4"
          fill="#C8A96A"
        />

        <p className="text-[#C8A96A] font-medium">
          Click to Reveal ❤️
        </p>
      </div>
    )}

  </div>
</motion.div>
))
}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-20 text-center"
    >
      <p className="text-xl text-gray-600 italic">
        And if twenty-four reasons aren't enough...
      </p>

      <p className="mt-4 text-3xl font-serif text-[#C8A96A]">
        I'd gladly spend the whole year writing more.
      </p>
    </motion.div>
  </div>
</section>
{/* GALLERY OF MEMORIES */}

<section className="py-32 px-6 bg-[#FAF9F6]">
  <div className="max-w-7xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        Gallery of Memories
      </h2>

      <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
        Some moments deserve to be remembered.
        Some smiles deserve to be seen again.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        {
          image:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          title: "Your Beautiful Smile",
          caption:
            "One smile can brighten an entire day.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9",
          title: "Pure Joy",
          caption:
            "A reminder that happiness looks good on you.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
          title: "A Special Memory",
          caption:
            "Moments become memories, memories become treasures.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df",
          title: "Grace",
          caption:
            "There is beauty in simply being yourself.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
          title: "Another Chapter",
          caption:
            "Every year adds another beautiful page to your story.",
        },
        {
          image:
            "https://images.unsplash.com/photo-1519345182560-3f2917c472ef",
          title: "Today",
          caption:
            "Celebrating twenty-four amazing years.",
        },
      ].map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <div className="overflow-hidden">
            <img
              src={photo.image}
              alt={photo.title}
              className="w-full h-[380px] object-cover group-hover:scale-110 transition duration-700"
            />
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-serif text-gray-800">
              {photo.title}
            </h3>

            <p className="mt-3 text-gray-600 leading-relaxed">
              {photo.caption}
            </p>
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-24 text-center max-w-4xl mx-auto"
    >
      <p className="text-3xl md:text-4xl font-serif text-[#C8A96A] leading-relaxed">
        "Some people pass through our lives and leave memories.
        Others leave footprints on our hearts."
      </p>
    </motion.div>
  </div>
</section>

{/* A FEW THINGS I HOPE YOU NEVER FORGET */}

<section className="py-32 px-6 bg-white">
  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        A Few Things I Hope You Never Forget
      </h2>
    </motion.div>

    <div className="space-y-8">
      {[
        "You are far stronger than you think.",
        "You are deeply valued by more people than you realize.",
        "Your presence matters.",
        "You don't have to have everything figured out right now.",
        "You deserve happiness, peace, and genuine love.",
        "Your future is brighter than your fears.",
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-[#FAF9F6] rounded-3xl p-8"
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-[#C8A96A] text-white flex items-center justify-center font-bold">
              {index + 1}
            </div>

            <p className="text-xl text-gray-700">
              {item}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* MY PRAYER FOR YOU */}

<section className="py-32 px-6 bg-[#FAF9F6]">
  <div className="max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        My Prayer For You
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl p-12 md:p-16 shadow-sm"
    >
      <p className="text-lg leading-loose text-gray-700">
        Abigail,
      </p>

      <p className="mt-8 text-lg leading-loose text-gray-700">
        As you step into this new year of your life,
        my prayer is that God surrounds you with peace
        that cannot be shaken, joy that cannot be stolen,
        and grace that never runs dry.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        May your dreams find direction.
        May your efforts bear fruit.
        May your heart remain strong even when life becomes difficult.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        May doors open for you.
        May your gifts make room for you.
        May you become everything God created you to be.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        And whenever life becomes overwhelming,
        may you always remember that God loves you,
        sees you, and walks with you.
      </p>

      <p className="mt-10 text-xl text-[#C8A96A] font-medium">
        Amen ❤️
      </p>
    </motion.div>
  </div>
</section>
{/* FUTURE WISHES */}

<section className="py-32 px-6 bg-white">
  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        Things I Hope For You
      </h2>

      <p className="mt-6 text-gray-600">
        Not just for today, but for the years ahead.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-2 gap-8">
      {[
        {
          title: "Peace",
          text: "The kind that remains even when life becomes noisy.",
        },
        {
          title: "Growth",
          text: "Growth in every area of your life and purpose.",
        },
        {
          title: "Success",
          text: "That your hard work produces beautiful results.",
        },
        {
          title: "Joy",
          text: "A joy that doesn't depend on circumstances.",
        },
        {
          title: "Fulfilled Dreams",
          text: "That the dreams in your heart become reality.",
        },
        {
          title: "God's Guidance",
          text: "That every step you take is directed by Him.",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#FAF9F6] rounded-3xl p-8"
        >
          <h3 className="text-2xl font-serif text-[#C8A96A]">
            {item.title}
          </h3>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {item.text}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

{/* VIDEO MESSAGE */}

<section className="py-32 px-6 bg-[#FAF9F6]">
  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-20"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        A Message From Me
      </h2>

      <p className="mt-6 text-gray-600">
        Press play whenever you're ready ❤️
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg"
    >
      <video
        controls
        className="w-full"
        poster="/hero.jpg"
      >
        <source src="/birthday-message.mp4" type="video/mp4" />
      </video>
    </motion.div>
  </div>
</section>

{/* FINAL LETTER */}

<section className="py-32 px-6 bg-white">
  <div className="max-w-4xl mx-auto">
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-5xl font-serif text-gray-800">
        One Last Thing...
      </h2>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="bg-[#FAF9F6] rounded-3xl p-12 md:p-16"
    >
      <p className="text-lg leading-loose text-gray-700">
        Abigail,
      </p>

      <p className="mt-8 text-lg leading-loose text-gray-700">
        If you've made it this far,
        thank you for taking this journey with me.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        I wanted this website to be more than a birthday message.
        I wanted it to be a reminder.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        A reminder that your life matters.
        Your dreams matter.
        Your happiness matters.
        And most importantly,
        you matter.
      </p>

      <p className="mt-6 text-lg leading-loose text-gray-700">
        Thank you for being yourself.
        Thank you for your kindness.
        Thank you for the memories.
      </p>

      <p className="mt-10 text-xl text-[#C8A96A]">
        Happy Birthday ❤️
      </p>
    </motion.div>
  </div>
</section>

{/* FINAL SURPRISE */}

<section className="min-h-screen flex items-center justify-center px-6 bg-[#FAF9F6]">
  <div className="text-center max-w-4xl">
    {!showFinalMessage ? (
      <>
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-5xl md:text-7xl font-serif text-gray-800"
        >
          Your Final Gift 🎁
        </motion.h2>

        <p className="mt-8 text-xl text-gray-600">
          There's one last message waiting for you.
        </p>

        <button
          onClick={() => {
            setShowFinalMessage(true);
            setShowConfetti(true);
          }}
          className="mt-10 px-10 py-5 rounded-full bg-[#C8A96A] text-white text-lg"
        >
          Open Final Gift
        </button>
      </>
    ) : (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h1 className="text-6xl md:text-8xl font-serif text-[#C8A96A]">
          Happy 24th Birthday
        </h1>

        <h2 className="mt-6 text-4xl md:text-6xl font-serif text-gray-800">
          My Joy ❤️
        </h2>

        <p className="mt-10 text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          If I could choose one thing for you this year,
          it would be that you see yourself the way God sees you:
          loved,
          valuable,
          beautiful,
          capable,
          and full of purpose.
        </p>

        <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Never forget that.
        </p>

        <p className="mt-12 text-3xl font-serif text-[#C8A96A]">
          — Samuel ❤️
        </p>
      </motion.div>
    )}
  </div>
  </section>
{/* SECRET HEART */}

<section className="py-24 px-6 bg-white">
  <div className="max-w-3xl mx-auto text-center">

    <p className="text-gray-400 mb-8">
      Before you leave...
    </p>

    <button
      onClick={() => setShowSecret(!showSecret)}
      className="text-5xl hover:scale-125 transition-all duration-300"
    >
      ❤️
    </button>

    {showSecret && (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 bg-[#FAF9F6] rounded-3xl p-10"
      >
        <h3 className="text-3xl font-serif text-[#C8A96A]">
          You Found It
        </h3>

        <p className="mt-8 text-lg text-gray-700 leading-loose">
          This wasn't part of the main gift.
        </p>

        <p className="mt-6 text-lg text-gray-700 leading-loose">
          I just wanted one place on this website
          where I could say something without
          trying to sound poetic.
        </p>

        <p className="mt-6 text-lg text-gray-700 leading-loose">
          Thank you for being part of my life.
        </p>

        <p className="mt-6 text-lg text-gray-700 leading-loose">
          Thank you for the smiles,
          the conversations,
          the memories,
          and even the moments you probably think
          were insignificant.
        </p>

        <p className="mt-6 text-lg text-gray-700 leading-loose">
          They weren't.
        </p>

        <p className="mt-8 text-2xl font-serif text-[#C8A96A]">
          The world is better because you're in it.
        </p>

      </motion.div>
    )}

  </div>
</section>
{/* SIGNATURE */}

<footer className="py-20 px-6 bg-[#FAF9F6] border-t">
  <div className="max-w-4xl mx-auto text-center">

    <p className="text-gray-600 leading-loose">
      Created with love,
      prayers,
      memories,
      gratitude,
      and a heart full of appreciation.
    </p>

    <p className="mt-8 text-xl text-[#C8A96A] font-serif">
      For Abigail's 24th Birthday ❤️
    </p>

    <p className="mt-4 text-gray-500">
      August 2026
    </p>

    <div className="w-24 h-px bg-[#C8A96A] mx-auto my-10" />

    <p className="text-3xl font-serif text-gray-800">
      — Samuel
    </p>

  </div>
</footer>
    </main>
  );
}