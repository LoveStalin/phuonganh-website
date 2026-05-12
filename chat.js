const toggleBtn = document.getElementById("chat-toggle");
const chatBox = document.getElementById("chat-box");
const closeBtn = document.getElementById("close-chat");

toggleBtn.onclick = () => {
    chatBox.classList.toggle("hidden");
};

closeBtn.onclick = () => {
    chatBox.classList.add("hidden");
};
import { db } from "./firebase.js";
import {
    collection,
    addDoc,
    onSnapshot,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// gửi tin nhắn
window.sendMessage = async function () {
    const input = document.getElementById("chat-input");
    const text = input.value;

    if (!text) return;

    await addDoc(collection(db, "messages"), {
        text,
        sender: "user",
        time: Date.now()
    });

    input.value = "";
};

// realtime nhận tin
const chatContainer = document.getElementById("chat-messages");

const q = query(collection(db, "messages"), orderBy("time"));

onSnapshot(q, (snapshot) => {
    chatContainer.innerHTML = "";

    snapshot.forEach((doc) => {
        const msg = doc.data();

        chatContainer.innerHTML += `
     <div style="
  text-align: ${msg.sender === "user" ? "right" : "left"};
">
  ${msg.text}
</div>
    `;
    });

    chatContainer.scrollTop = chatContainer.scrollHeight;
});