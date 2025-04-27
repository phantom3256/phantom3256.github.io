const URL = "./model/"; // Folder where you exported the model

let model, webcam, labelContainer, maxPredictions;

// Load the model and setup the webcam
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Setup webcam
    const flip = true;
    webcam = new tmImage.Webcam(300, 300, flip);
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(updateWebcam);

    document.getElementById("webcam-container").appendChild(webcam.canvas);

    // Enable the scan button
    document.getElementById("predict-button").disabled = false;
}

async function updateWebcam() {
    webcam.update();
    window.requestAnimationFrame(updateWebcam);
}

// When Scan Button is pressed
async function predict() {
    const prediction = await model.predict(webcam.canvas);

    // Find the highest probability class
    let highestPrediction = prediction[0];
    for (let i = 1; i < prediction.length; i++) {
        if (prediction[i].probability > highestPrediction.probability) {
            highestPrediction = prediction[i];
        }
    }

    // Display the result
    const label = highestPrediction.className;
    document.getElementById("prediction-label").innerText = label;

    // Make prediction container visible
    document.getElementById("prediction-container").classList.remove('hidden');
}
