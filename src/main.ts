import "./style.css";
import { encloseToContainer, getElementContentSize, throttle } from "./utils";
import metadata from "@/content/metadata.json";

const canvasContainerElement = document.getElementById("canvas-container")!;
let canvas: HTMLCanvasElement | null = null;
let worker: Worker | null = null;
let id: string | null = "1";
let sectionKey: string | null = null;

// create options
interface Sections {
  [key: string]: {
    title: string;
  };
}

const addSections = (select: HTMLSelectElement, sections: Sections) => {
  const fragment = document.createDocumentFragment();
  for (const key in sections) {
    console.log(key);
    if (sectionKey === null) {
      sectionKey = key;
    }

    const option = document.createElement("option");
    option.value = key;
    option.textContent = sections[key].title;
    fragment.appendChild(option);
  }
  select.appendChild(fragment);
};

const addLessons = (
  select: HTMLSelectElement,
  metadata: any,
  sectionId: string
) => {
  select.replaceChildren();
  const fragment = document.createDocumentFragment();
  for (const key in metadata) {
    if (key === "sections" || metadata[key].section !== sectionId) {
      continue;
    }

    const option = document.createElement("option");
    option.value = key;
    option.textContent = metadata[key].title;
    fragment.appendChild(option);
  }
  select.appendChild(fragment);
};

const selectSectionElement = document.getElementById(
  "section-select"
) as HTMLSelectElement;
addSections(selectSectionElement, metadata.sections);

const selectLessonElement = document.getElementById(
  "lesson-select"
) as HTMLSelectElement;
addLessons(selectLessonElement, metadata, sectionKey!);

// canvas worker functions

const resizeCanvasThrottled = throttle(() => {
  if (!worker) {
    return;
  }

  const { width, height } = getElementContentSize(canvasContainerElement);
  worker.postMessage({
    event: "resize",
    containerWidth: width,
    containerHeight: height,
  });
}, 1000 / 20);

const preInitialize = () => {
  canvas = document.createElement("canvas");
  encloseToContainer(canvasContainerElement, canvas);
  canvas.id = "canvas";
  canvasContainerElement.appendChild(canvas);
};

const initializeWorker = () => {
  if (worker || !canvas) {
    return;
  }

  worker = new Worker(new URL("./workers/worker.ts", import.meta.url), {
    type: "module",
  });
  const offscreen = canvas.transferControlToOffscreen();
  worker.onmessage = (evt) => {
    const { event } = evt.data;
    switch (event) {
      case "initialized":
        startWorker();
    }
  };
  addEventListener("resize", resizeCanvasThrottled);
  worker.postMessage(
    {
      event: "init",
      canvas: offscreen,
    },
    [offscreen]
  );
};

const startWorker = () => {
  if (!worker || !id) {
    return;
  }

  worker.postMessage({ event: "start", id });
};

const terminateWorker = () => {
  if (!worker) {
    return;
  }

  worker.terminate();
  worker = null;
};

const cleanup = () => {
  if (!canvas) {
    return;
  }

  removeEventListener("resize", resizeCanvasThrottled);
  canvas.remove();
  canvas = null;
};

preInitialize();
initializeWorker();
startWorker();

// on section change
selectSectionElement.addEventListener("change", (event) => {
  // @ts-ignore
  sectionKey = event.target.value;
  addLessons(selectLessonElement, metadata, sectionKey!);
});

selectLessonElement.addEventListener("change", (event) => {
  // @ts-ignore
  if (id === event.target.value) return;

  // @ts-ignore
  id = event.target.value;
  terminateWorker();
  cleanup();
  preInitialize();
  initializeWorker();
  startWorker();
});
