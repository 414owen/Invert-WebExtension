const loader = document.querySelector("#loader");
const display = document.querySelector("#binding");

let a = true;
const storage = (browser || chrome).storage.local;

storage.get(["binding"], obj => {
  const binding = obj.binding || "d";
  display.innerText = binding;
});

const rebind = () => {
  const listener = () => {
    loader.className = a ? "one" : "two";
    a = !a;
  };
  window.addEventListener("keydown", listener);
  Mousetrap.record(sequence => {
    const res = sequence.join(" ");
    display.innerText = res;
    storage.set({binding: res});
    window.removeEventListener("keydown", listener);
  });
};

document.querySelector("button").addEventListener("click", rebind);
