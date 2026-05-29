export type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  cover: string;
  excerpt: string;
  readingTime: string;
  tags: string[];
  body: string;
};

// Newest first — Pangong (Feb 2026) leads, EBC (May 2025) follows.
export const _postsRaw: Post[] = [
  {
    slug: "everest-base-camp",
    title: "A Year Ago, I Walked to Everest Base Camp",
    subtitle: "Notes from the Khumbu, where Ama Dablam refused to be photographed.",
    date: "2025-05-05",
    cover: "/images/ebc/ebc-amadablam-wide.jpg",
    excerpt:
      "Not to prove that we could. Not to collect a photograph beside a famous rock. We went because we wanted to disappear into the mountains for a while.",
    readingTime: "8 min",
    tags: ["trek", "himalaya", "nepal"],
    body: `Exactly a year ago, my friend Chaitanya and I walked to Everest Base Camp. Not to prove that we could. Not to collect a photograph beside a famous rock.

We went because we wanted to disappear into the mountains for a while. To step away from noise, from routine, from the weight of ordinary life — and somewhere beneath all of that, I went to see Ama Dablam, the most beautiful mountain.

The journey began with the chaotic little flight to Lukla, landing on a runway hanging between cliffs and clouds, as if someone had forgotten to finish building the airport. The shortest runway in the world and the most dangerous flight in the world.

From there, the trail began.

The Dudh Koshi river seemed to follow us everywhere. Sometimes far below, sometimes roaring beside us, but always there — restless, silver, alive. Suspension bridges swayed over deep valleys. Prayer flags snapped in the freezing wind. Tiny tea houses welcomed us with steaming cups of ginger lemon tea and Dal bhat. Sherpas moved across the trail with a quiet strength that made everyone else question their own.

Whenever yaks approached, our guide would calmly say, "Left side." So we pressed ourselves against the stone walls and watched them pass, bells ringing softly around their necks, carrying loads that seemed impossible.

## Then came Namche Bazaar.

Namche felt like the last place where the world was still familiar. A tiny mountain town alive in the middle of nowhere — cafes, bakeries, trekking shops. It had its own personality. It appeared after a climb that felt longer than the map had promised. It sat in the mountains like a secret.

After Namche, the trail began taking things away. Trees disappeared. Green slowly faded into grey, brown, and white.

And then, Ama Dablam appeared.

Not all at once. The Himalayas are cruel like that. They never reveal beauty immediately. They tease it out slowly — a pale edge through the clouds, a sharp ridge between darker slopes, a glimpse that vanishes before you are even sure you saw anything at all.

And maybe that is why I kept looking for it at every turn. When Ama Dablam finally stood fully in view, the valley seemed to fall silent around it. It rose above the Khumbu with an impossible kind of elegance — beautiful, imposing, cold, untouchable, unbothered by your existence.

I had seen mountains before.
I had admired them.
I had remembered them.

This was different.

I kept looking back. Once. Twice. Too many times.

> Some beauty asks to be admired. Some beauty ruins your ability to admire anything else the same way again.

Everywhere we went, Ama Dablam somehow returned into view again. Far. Close. Hidden. Visible. The closer we got, the more unreachable it felt.

People say Ama Dablam is technically harder to climb than Everest. I believe it. Some things feel impossible not because they are distant or higher, but because even when they stand right before you, they remain beyond reach.

## Dingboche

By the time we reached Dingboche, the mountains had grown harsher and even more beautiful. We woke to windows coated in frost, our rooms holding the night's cold as if the walls had absorbed it. We rubbed circles into the glass to look outside.

Beyond it, the first sunlight touched Ama Dablam. First pale, then gold, then blazing. It looked as if someone were slowly lighting the mountains from within.

We had two acclimatization days, though rest felt like a generous word for them. In the mountains, rest often means climbing higher so your body can learn how little oxygen it is going to get, then returning to sleep with tired legs and a headache you pretend is normal.

The walk from Dingboche to Lobuche felt like the trek had quietly changed its mood. The trail opened into a colder, harsher landscape, with few villages and less colour. Then came the memorials. Stone structures wrapped in prayer flags, dedicated to climbers who never returned from Everest. Names weathering in the wind. Ambition, courage, miscalculation, and luck — all resting together beneath the same enormous sky. You do not need a lecture on mortality when the mountains have already written one in stone.

## 3 AM, beneath the Milky Way

The final push began at 3 in the morning, and then came the night I'll never forget. We started walking at 3 in the morning. The Milky Way was waiting.

The stars did not seem above us. They were around us. The sky had depth. It had texture. It felt alive. Even the mountains looked smaller beneath that sky. For a moment, no one moved.

Someone whispered, "Look at that." As if any of us were capable of looking anywhere else.

You spend so much of life believing your thoughts are enormous, your plans urgent, your worries consequential — that you are the centre of your own universe. Then at 3 AM in the Himalayas, beneath the Milky Way, you understand that the universe has been magnificent without you for billions of years.

The universe had always looked like this. We were simply too distracted, too brightly lit, too sealed inside our own lives to notice.

## Everest Base Camp

Then, finally, Everest Base Camp.

Tired legs. Dry lips. Water bottles half frozen. Hands shaking slightly while reaching for phone cameras. Exhausted smiles from people who understood exactly what it had taken to get there.

After years of seeing Everest in documentaries, books, maps, and dreams, I was standing in its backyard. Not on the summit. Not above the world. But close enough to feel the gravity of its myth.

Everest itself was different from what I expected. It starts playing hide and seek with you. You spend days walking toward Everest while catching only partial glimpses — a dark false summit in the distance, a shy triangle beyond Nuptse, a presence that keeps refusing to become obvious.

Pictures can give shape, colour, proportion — but they flatten mountains. They turn enormity into a frame of 4:3, 9:16 ratio. But standing there, with the Himalayan giants before me, I understood that some things cannot be carried back in images. They can only be experienced once, and then missed forever.`,
  },
  {
    slug: "pangong-frozen-marathon",
    title: "The Last Run",
    subtitle:
      "42 km on the world's highest frozen lake. -22°C. Torn ice cleats. A stranger who became strength.",
    date: "2026-02-15",
    cover: "/images/pangong/pangong-portrait.jpeg",
    excerpt:
      "At over 4,350m above sea level, Pangong becomes a vast mirror that reflects the mountains, the sky, and every doubt carried by those who dare to step on it.",
    readingTime: "10 min",
    tags: ["marathon", "ladakh", "endurance"],
    body: `At over 4,350m above sea level, Pangong lake becomes something unreal in winter — a vast mirror that reflects the mountains, sky and every doubt carried by those who dare to step on it. In daylight, temperatures hovered around -15°C. In the mornings and evenings, they dropped closer to -25°C. The cold did not merely surround me. It entered me. The air was thin, the winds relentless, and the landscape so severe that standing there you don't feel like a runner preparing for a race. You feel like a small dot placed before nature itself.

The frozen lake stretched endlessly beneath our feet, vast and intimidating. Unlike traditional races, the Pangong Frozen Lake Marathon carries a deeper message than medals, timings or rankings. Known as **"The Last Run,"** it exists as a warning as much as an event — a reminder that climate change may one day prevent the lake from freezing as it once did. Every footstep on its icy surface feels temporary, almost borrowed. Every kilometer felt like movement across something beautiful, fragile, and possibly vanishing.

Officially recognized by the Guinness World Records as the world's highest frozen lake marathon, it is often described as one of the coolest runs on Earth. It feels as if nature has carved a track of ice for a select few who dare to step upon it. But standing there, you realize quickly — this race is not about records. It is about respect.

Respect for altitude. Respect for cold. Respect for uncertainty. Respect for a landscape that can humble even the strongest athlete within minutes.

The cold feels alive. The altitude is unforgiving. The winds feel deadly. Yet the lake makes everything worth it.

## Arrival in Leh

The journey began in Leh, where thin air greeted newcomers before they even collected their luggage. Around fifty runners had arrived here from outside Ladakh, each carrying stories of endurance races and impossible terrains. Among them were only a handful of full marathon participants with remarkable resumes — Half Ironmans, more than seventy marathons, Antarctica races, Arctic Circle races, 100 km ultras, Seven Star finishes, the Machu Picchu marathon and more. Listening to their conversations made me feel small sometimes. I stood there absorbing everything, reminding myself that everyone has a first time and this is mine.

Because I was the newbie here. Just a month earlier, I had completed my first full marathon at Tata Mumbai Marathon. And now I was here, surrounded by athletes who seemed from a different world.

## The Days Before Pangong

Before we headed to Pangong, there was an evening that now feels strangely precious in hindsight. We danced. It happened in the hotel in Leh, in that in-between space before the race had tested any of us. Music filled the room and runners who had met only a few days earlier began laughing, celebrating and dancing as though they had known one another for much longer. Anshu, Ashutosh, Anish, Shraddha, and Vikram became the heart of that little circle of laughter and music. It was fascinating how quickly bonds formed. In the mountains, where the body is already being stripped down by altitude, people seem to understand each other almost instantly. When everyone knows they are heading toward something difficult, unnecessary barriers fall away. You stop trying to impress. You stop comparing. You simply connect.

For a few hours, the pressure of the race disappeared. So did the fear. The frozen lake was still waiting for us, but that night we were not athletes thinking about running or distances. We were simply people, far from home, brought together by one improbable journey.

That memory matters to me because endurance is often described only through pain — the solitary miles, the fatigue, the battle between body and mind. But that is only part of the truth. Sometimes endurance begins in joy. Sometimes it begins in laughter echoing across a hotel hall in Leh. Sometimes the friendships formed before the race become part of the reason you find the strength to continue during it.

## Medical Check

Before the race, every runner underwent detailed medical screening. It was a reminder that this was not an event where enthusiasm alone could carry you through.

There were ECGs, blood pressure checks, oxygen saturation readings, blood sugar checks — all the metrics that suddenly become far more than numbers. At such altitude, nature does not care about confidence. It only responds to physiology.

This marathon feels less like a competition and more like a conversation with fear. I didn't come here to prove I am stronger than the mountains — nobody is. I came to see what happens when I keep moving forward despite doubt.

Experienced runners arrive with strategies, pacing plans, and stories from extreme environments. Beginners arrive with something else — curiosity. Maybe being a newbie here was not a disadvantage. Maybe it is the purest way to experience the mountains — without expectation, without comparison, without a previous version of yourself to chase.

## The sound of ice

The race began with a mistake. Somewhere in the early morning rush, I forgot my phone. At first it felt careless. Then as the race unfolded, it became something else entirely. Without music, there was no distraction. No rhythm fed artificially into my ears. No escape from environment.

There was only the truth of the place. The raw sound of the Himalayan wind and the sharp metallic crunch of ice cleats biting into frozen lake.

At -22°C, even the body's smallest functions felt altered. Even breathing felt heavy. Saliva froze mid-run. Eyelashes stiffened. The cold turned ordinary sensations into something unfamiliar. Every step echoed across Pangong Lake like a warning. This was not a normal marathon. Out here, pace was secondary, comfort was irrelevant. The real competitors were not the other runners, not the clock or the distance — it was the environment itself.

## When gear and body begin to fail

Somewhere along the frozen course, the ice cleats tore. It happened without warning, just one more detail in an already hostile setting. But the consequences were immediate. Traction disappeared. Slips and falls followed. Pulse dropped low at one point. The body, already under stress from altitude, began to feel heavier with each passing kilometer. Pangong had stripped the experience down to something elemental, and for a brief moment the race stopped feeling like sport. It felt like survival.

At around 29-30 km, a quiet thought arrived.

> Maybe this is where it ends.

There was no drama in it. No self-pity. Just a clear recognition of what my body was telling me. The winds grew stronger as the sun dropped lower. Ice began to lift from the lake and sweep across the surface like frozen dust. Breathing became shallow and stopping started to feel logical rather than weak.

Many runners talk about a point in a race where ego disappears and instinct takes over. On Pangong, I had reached mine.

## The stranger who became strength

At the 31 km checkpoint, a small group of organisers stood waiting in the cold. By the time I reached there, exhaustion had taken over me completely. The body was no longer cooperating — it was simply surviving one effort at a time. The wind felt heavier, my steps slower, and the distance ahead seemed longer than it should have. The wind had become vicious. Every exposed inch of skin seemed aware of it.

For the first time, I didn't try to look strong. I simply asked one of them if they could accompany me for a while. One of them, **Karma Tashi**, stepped forward without hesitation. He began moving alongside me — mostly walking and very less running — matching my pace without pressure, turning the final 11 kilometers into a shared journey rather than a lonely battle. This changed everything. The last stretch stopped being just a test of endurance and became something gentler, something more humane.

Conversation replaced silence. Presence replaced isolation. Without him, finishing might have remained only a possibility. Endurance is often romanticized as independence, as if strength is proved only when everything is carried alone. Pangong taught me otherwise. Sometimes strength lies in accepting help when the environment tests your limits.

## The winds at the end

By evening, this was no longer the cold, constant fatigue that had accompanied us all day. The winds grew heavier, faster and far more aggressive, sweeping across the frozen lake with a violence that made the landscape itself feel unstable. My body, already depleted, had to brace not just against exhaustion but against the force of the wind itself. And then came the image that stayed with me long after the finish. The closing structure at the finish line — the very thing we were supposed to run through — had already fallen apart in the wind.

There was something hauntingly perfect about that moment. Even the finish line could not fully stand against Pangong. It was as if the lake and the weather were reminding us one final time — nothing here belongs to us. Not the route. Not the triumph. Not even the ending.

## A quiet finish

Crossing the finish line did not feel loud or cinematic. After everything the lake had taken from the body, the finish felt almost quiet. However, a deep pride replaced doubt. Pride not in pace or ranking, but in refusing to quit despite torn gear, freezing breath, brutal wind at the end and a body that nearly gave up.

This was not just the completion of a marathon. It is proof that even a newcomer — uncertain, underprepared in experience and overwhelmed by the scale of the challenge — can stand in the harshest environment on earth and keep moving forward.

Long after the race ended, Pangong stayed with me. Not just in photographs or conversations, but something deeper — where certain experiences settle and refuse to leave. It stayed with me because it altered something fundamental about how I understand endurance.

It also taught that strength is rarely loud, that comparison fades when survival becomes the goal — that beginners sometimes carry the most powerful advantage: the ability to experience something without expectation, without the burden of trying to recreate an earlier triumph.

And maybe that is what "The Last Run" truly means.

Not only a race against climate change. Not only a record on ice. Not only a marathon at the edge of human comfort.

But a reminder that every step we take — on frozen lakes or in everyday life — is temporary, fragile, and is beautiful precisely because it does not last forever.

On Pangong, nothing felt permanent.

Not the ice. Not the weather. Not my body's strength which I had been so proud of. Not even the finish line.

And maybe that is why the journey felt so meaningful.`,
  },
];

// Sort newest first by ISO date — gives Pangong priority over EBC.
export const posts: Post[] = [..._postsRaw].sort((a, b) => b.date.localeCompare(a.date));

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
