/* Client-side ELIZA (static GitHub Pages version)
*/

const resp = {
  "* i am * because i am *": [
    (wc) => "How is you being " + wc[2] + " related to being " + wc[1] + "?"
  ],

  "* i feel * because *": [
    (wc) => "How is " + wc[2] + " related to you feeling " + wc[1] + "?",
    (wc) => "Has " + wc[2] + " reallly made you feel " + wc[1] + "?",
    (wc) => "Has " + wc[2] + " always made you feel " + wc[1] + "?"
  ],

  "* i love * because *": [
    (wc) => "How is " + wc[2] + " related to you loving " + wc[1] + "?"
  ],

  "* i want * because *": [
    (wc) => "Why does " + wc[2] + " make you want " + wc[1] + "?"
  ],

  "* i am * because *": [
    (wc) => "What about " + wc[2] + " makes you " + wc[1] + "?"
  ],

  "* i am *": [
    (wc) => "Why are you " + wc[1] + "?",
    (wc) => "How long have you been " + wc[1] + "?",
    (wc) => "Do you think it is normal to be " + wc[1] + "?",
    (wc) => "Hi " + wc[1] + ", I am Daddy;)"
  ],

  "* i feel *": [
    (wc) => "Why do you feel " + wc[1] + "?",
    (wc) => "Do you enjoy feeling " + wc[1] + "?",
    (wc) => "What does feeling " + wc[1] + " remind you of?",
    (wc) => "Do you often feel " + wc[1] + "?"
  ],

  "* you are *": [
    (wc) => "Why am I " + wc[1] + "?",
    () => "oh am I now;)",
    (wc) => "Do you wish I was " + wc[1] + "?",
    (wc) => "Am I " + wc[1] + " in your fantasies?",
    (wc) => "Are you pleased to believe that I am " + wc[1] + "?"
  ],

  "* i want *": [
    (wc) => "What does " + wc[1] + " mean to you?",
    (wc) => "Do you really want to be able to " + wc[1] + "?",
    (wc) => "What if you never get " + wc[1] + "?",
    (wc) => "Do you really think you deserve " + wc[1] + "?"
  ],

  "* i love *": [
    (wc) => "Why do you love " + wc[1] + "?",
    (wc) => "How strongly do you love " + wc[1] + "?",
    (wc) => "Have you always loved " + wc[1] + "?",
    (wc) => "Does " + wc[1] + " make you tingle inside?",
    (wc) => "Do you deserve " + wc[1] + "?"
  ],

  "* i like *": [
    (wc) => "What about " + wc[1] + " appeals to you?"
  ],

  "* i believe *": [
    (wc) => "Why do you believe " + wc[1] + "?",
    (wc) => "What has made you believe " + wc[1] + "?",
    (wc) => "When did you start believing " + wc[1] + "?"
  ],

  "* i have *": [
    (wc) => "How long have you had " + wc[1] + "?",
    (wc) => "When did you get " + wc[1] + "?"
  ],

  "* are you *": [
    (wc) => "Do you believe I am " + wc[1] + "?",
    (wc) => "What makes you think that I am " + wc[1] + "?",
    (wc) => "Why do you ask if I am " + wc[1] + "?",
    (wc) => "Do you want me to be " + wc[1] + "?"
  ],

  "* i cant *": [
    () => "Why can't you?"
  ],

  "* i can *": [
    (wc) => "Can you really " + wc[1] + "?",
    () => "Prove it",
    (wc) => "Are you sure you can " + wc[1] + "?"
  ],

  "* why are *": [
    () => "Do you believe that everything needs an explanation?",
    () => "The explanation is rather complicated"
  ],

  "* i do *": [
    (wc) => "Why do you " + wc[1] + "?"
  ],

  "because *": [
    () => "Why do you believe that?",
    () => "Have you always believed that?"
  ],

  "* what is *": [
    () => "Some things are better left unanwsered",
    (wc) => "What do you think " + wc[1] + " is?"
  ],

  "* is *": [
    (wc) => "How does " + wc[0] + " being " + wc[1] + " make you feel?",
    (wc) => "Why do you think that " + wc[0] + " is " + wc[1] + "?"
  ],

  "my day *": [
    (wc) => "What has made your day " + wc[0] + "?"
  ]
};

let name = "You";
let Elizaname = "Eliza";

// default avatars (same as your original template)
let Elizaurl =
  "https://i.pinimg.com/564x/6e/57/2b/6e572b2de740df048620481f43c13f64.jpg";
let url = "https://www.anime-planet.com/images/characters/tooru-oikawa-59826.jpg";

const terminal = "!.?";

const sadwords = [
  "sad", "depressed", "lonely", "tired", "exhausted",
  "meaningless", "worthless", "horrible", "hate"
];

const happywords = ["happy", "good", "glad", "joy", "excite", "great", "amazing"];

const deadconvo = ["yea", "yes", "cool", "ok", "okay", "k", "nice", "lol", "lmao"];

/** --------------------------
 *  Your existing helpers
 *  -------------------------- */

function cleaning(msg) {
  let s = msg.toLowerCase();
  s = s.replaceAll("’", "'").replaceAll("'", "");
  // a few contractions/normalizations
  s = s.replaceAll(" u ", " you ");
  s = s.replaceAll("wanna", "want");
  s = s.replaceAll("i dont know", "idk");
  s = s.replaceAll("how are you", "hru");
  s = s.replaceAll("im", "i am");
  s = s.replaceAll("youre", "you are");
  s = s.replaceAll("just", "");
  s = s.trim();
  return s;
}

function changePronouns(msg) {
  // simple swap to keep things Eliza-ish
  const words = msg.split(/\s+/).map((w) => {
    if (w === "you") return "me";
    if (w === "me") return "you";
    if (w === "i") return "you";
    if (w === "my") return "your";
    if (w === "your") return "my";
    if (w === "myself") return "yourself";
    if (w === "yourself") return "myself";
    if (w === "mine") return "yours";
    if (w === "yours") return "mine";
    return w;
  });
  return words.join(" ");
}

async function getDadJoke() {
  try {
    const r = await fetch("https://icanhazdadjoke.com/", {
      headers: { Accept: "application/json" },
    });
    if (!r.ok) throw new Error("bad response");
    const data = await r.json();
    return data.joke || "I forgot the joke… awkward.";
  } catch {
    return "I tried to fetch a dad joke but the internet said no 😔";
  }
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function ifAllElseFails(cleanMsg, convo) {
  const msg = cleanMsg.replace(/[^\w\s]/g, "").trim();

  if (!msg) return "Say something for me to respond to :)";

  if (deadconvo.includes(msg)) {
    return pick([
      "Wanna hear a joke? (type 'joke')",
      "How has your day been?",
      "Tell me more about your childhood.",
      "What can I do to make you feel better?",
    ]);
  }

  for (const w of sadwords) {
    if (msg.includes(w)) {
      return pick([
        "You sound really down. Want to talk about what's been going on?",
        "I'm sorry you're feeling that way. What do you think triggered it?",
        "That sounds heavy. What would help right now?",
      ]);
    }
  }

  for (const w of happywords) {
    if (msg.includes(w)) {
      return pick([
        "I'm glad to hear that :)",
        "What do you think contributed to that feeling?",
        "How can we keep that energy going?",
      ]);
    }
  }

  // lightweight “backtrack” sometimes
  if (convo.user.length >= 2 && Math.random() < 0.15) {
    const past = pick(convo.user.slice(-6));
    return `Earlier you said "${past}". Tell me more about that.`;
  }

  return pick([
    "Tell me more.",
    "How does that make you feel?",
    "Why do you say that?",
    "What are you getting at?",
    "Go on…",
  ]);
}

/** --------------------------
 *  Wildcard database engine
 *  (matches patterns like "* i feel * because *")
 *  -------------------------- */

// Escape regex special chars in literal segments
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Convert a Python-style wildcard pattern into a regex that captures each '*'
 * Example: "* i feel * because *"
 *  -> ^\s*(.*?)\s+i\s+feel\s+(.*?)\s+because\s+(.*?)\s*$
 *
 * Returns array of captures in order, or null if no match.
 */
function matchWildcardPattern(pattern, input) {
  // split on '*' and stitch with capture groups
  const parts = pattern.split("*").map((p) => p.trim()).filter((p) => p.length > 0);

  // If pattern is only "*" (unlikely), match anything.
  if (pattern.trim() === "*") return [""];

  // Build regex with flexible whitespace
  let regexStr = "^\\s*";
  if (pattern.trim().startsWith("*")) {
    // leading wildcard capture
    regexStr += "(.*?)";
  }

  for (let i = 0; i < parts.length; i++) {
    const lit = parts[i];
    // require the literal segment (with whitespace flex)
    const litRegex = escapeRegex(lit).replace(/\s+/g, "\\s+");
    regexStr += "\\s*" + litRegex + "\\s*";

    // add capture after each literal if there's another '*' after it
    // In a split-by-* model, there is a wildcard between every pair of parts,
    // and also possibly trailing wildcard.
    const hasWildcardAfter = true;
    regexStr += "(.*?)";
  }

  // If pattern does NOT end with '*', then the last "(.*?)" we added above is extra.
  // Easiest correction: build using counting of '*' instead.
  // Let's do it properly using scanning:

  // Proper build:
  const starCount = (pattern.match(/\*/g) || []).length;
  const litParts = pattern.split("*").map((p) => p.trim());
  // litParts length = starCount + 1

  regexStr = "^\\s*";
  for (let i = 0; i < litParts.length; i++) {
    const litSeg = litParts[i];
    if (litSeg) {
      regexStr += escapeRegex(litSeg).replace(/\s+/g, "\\s+");
    }
    if (i < litParts.length - 1) {
      // between lit segments there is a wildcard capture
      regexStr += "\\s*(.*?)\\s*";
    }
  }
  regexStr += "\\s*$";

  const re = new RegExp(regexStr, "i");
  const m = input.match(re);
  if (!m) return null;

  // m[1..] are wildcard captures, trimmed
  return m.slice(1).map((x) => (x ?? "").trim());
}

/**
 * Try to generate a response using imported resp database.
 * Returns string or null if no pattern matched.
 */
function respondFromDatabase(cleanMsg) {
  // IMPORTANT: preserve insertion order of patterns as written in resp.js
  for (const pattern of Object.keys(resp)) {
    const caps = matchWildcardPattern(pattern, cleanMsg);
    if (!caps) continue;

    // In your Python you used wc[1], wc[2]... (not wc[0]),
    // so we mimic that by adding a dummy at index 0.
    const wc = ["", ...caps];

    const options = resp[pattern];
    const fn = pick(options);
    try {
      return fn(wc);
    } catch {
      // if a rule function throws, ignore and keep searching
      continue;
    }
  }
  return null;
}

/** --------------------------
 *  Main responder
 *  -------------------------- */

async function respond(rawMsg, convo) {
  // normalize + strip trailing punctuation
  const cleanMsg = cleaning(rawMsg).replace(terminal, "").trim();

  // quick canned responses
  if (cleanMsg.includes("good morning")) return "Good morning!";
  if (cleanMsg.includes("good night")) return "Good night!";
  if (cleanMsg === "no") return "Why so negative?";
  if (cleanMsg === "hi" || cleanMsg.includes("hello") || cleanMsg.includes("hey")) {
    return pick(["Hi!", "hi there", "Hello :) how are you?", "Heyyy, how's your day?"]);
  }
  if (cleanMsg.includes("hru")) return "I'm good — but I want to focus on you. How are you?";

  // dad joke trigger (kept from your old rules array)
  if (/\bjoke\b/i.test(cleanMsg)) return await getDadJoke();

  // ✅ FIRST: your imported wildcard database
  const dbOut = respondFromDatabase(cleanMsg);
  if (typeof dbOut === "string" && dbOut.length > 0) return dbOut;

  // default: pronoun swap for a “reflect back” style
  if (cleanMsg.split(/\s+/).length > 2 && Math.random() < 0.25) {
    return `Why do you say "${changePronouns(cleanMsg)}"?`;
  }

  return ifAllElseFails(cleanMsg, convo);
}

/** --------------------------
 *  UI wiring (unchanged)
 *  -------------------------- */

function appendMessage(isUser, text) {
  const ul = document.getElementById("output");
  const li = document.createElement("li");
  li.className = isUser ? "msg-user" : "msg-eliza";
  li.textContent = text;

  // style to match your original alternating bubbles with avatars
  if (isUser) {
    li.style.backgroundColor = "#8768F2";
    li.style.backgroundImage = `url('${url}')`;
  } else {
    li.style.backgroundImage = `url('${Elizaurl}')`;
  }

  ul.appendChild(li);

  // keep scroll pinned to bottom
  const chatHistory = document.getElementById("chat");
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

function boot() {
  document.getElementById("playerpfp").src = url;
  document.getElementById("Elizapfp").src = Elizaurl;

  const convo = { user: [], eliza: [] };

  // initial greeting
  appendMessage(false, `${Elizaname}: Hi there, how are you?`);
  convo.eliza.push("Hi there, how are you?");

  // chat submit
  document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("Elizainput");
    const raw = (input.value || "").trim();
    input.value = "";

    if (!raw) return;

    appendMessage(true, `${name}: ${raw}`);
    convo.user.push(raw);

    const reply = await respond(raw, convo);
    appendMessage(false, `${Elizaname}: ${reply}`);
    convo.eliza.push(reply);
  });

  // set user name
  document.getElementById("playerform").addEventListener("submit", (e) => {
    e.preventDefault();
    const field = document.getElementById("Playername");
    const value = (field.value || "").trim();
    if (value) {
      name = value;
      field.value = "";
      field.setAttribute("placeholder", " " + name);
    } else {
      alert("Please submit a valid name");
    }
  });

  // set Eliza name
  document.getElementById("Elizaform").addEventListener("submit", (e) => {
    e.preventDefault();
    const field = document.getElementById("Elizaname");
    const value = (field.value || "").trim();
    if (value) {
      Elizaname = value;
      field.value = "";
      field.setAttribute("placeholder", " " + Elizaname);
    } else {
      alert("Please submit a valid name");
    }
  });

  // user avatar upload
  window.addEventListener("load", () => {
    const file = document.getElementById("file");
    file.value = "";
    file.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        url = URL.createObjectURL(this.files[0]);
        document.getElementById("playerpfp").src = url;

        // update existing bubbles
        document.querySelectorAll("li.msg-user").forEach((li) => {
          li.style.backgroundImage = `url('${url}')`;
        });
      }
    });
  });

  // eliza avatar upload
  window.addEventListener("load", () => {
    const file = document.getElementById("Elizafile");
    file.value = "";
    file.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        Elizaurl = URL.createObjectURL(this.files[0]);
        document.getElementById("Elizapfp").src = Elizaurl;

        // update existing bubbles
        document.querySelectorAll("li.msg-eliza").forEach((li) => {
          li.style.backgroundImage = `url('${Elizaurl}')`;
        });
      }
    });
  });

  // Enter to send (keep Shift+Enter unused since it's an <input>)
  document.getElementById("Elizainput").addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.getElementById("form").requestSubmit();
    }
  });
}

document.addEventListener("DOMContentLoaded", boot);
