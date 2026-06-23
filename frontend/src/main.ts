import App from "./App.svelte";
import "./app.css";

const target = document.getElementById("app");
if (target) {
  new App({ target });
}
