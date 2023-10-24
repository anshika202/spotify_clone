console.log("welcome to spotify");

let songIdx = 0;
let masterSongName = document.getElementById('masterSongName');
let audioElement = new Audio(`songs/${songIdx + 1}.mp3`);
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));


let songs = [
    { songname: "calm down", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songname: "chaleya", filePath: "songs/2.mp3", coverPath: "covers/1.jpg" },
    { songname: "let me down", filePath: "songs/3.mp3", coverPath: "covers/1.jpg" },
    { songname: "hello", filePath: "songs/4.mp3", coverPath: "covers/1.jpg" },
    { songname: "attention", filePath: "songs/5.mp3", coverPath: "covers/1.jpg" },
    { songname: "tum tak", filePath: "songs/6.mp3", coverPath: "covers/1.jpg" },
]


songItems.forEach((element, i) => {
    // console.log(element,i);

    element.getElementsByTagName("img")[0] = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
})




// handle play/pause





// listening to events

audioElement.addEventListener('timeupdate', () => {
    // console.log('timeUdpate');

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    // console.log(progress)

    myProgressBar.value = progress    // this makes the progressBar or range-bar move when the song is played
})

myProgressBar.addEventListener('change', () => {

    audioElement.currentTime = myProgressBar.value * (audioElement.duration / 100);
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })

}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {

    element.addEventListener('click', (e) => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            makeAllPlays();
            songIdx = parseInt(e.target.id);
            masterSongName.innerText = songs[songIdx].songname;
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIdx + 1}.mp3`;
            audioElement.currentTime = 0;
            audioElement.play();
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }

        else {
            audioElement.pause();
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        }

    })
})

document.getElementById('forward').addEventListener('click', () => {

    if (songIdx >= 5) {
        songIdx = 0;
    }

    else {
        songIdx += 1;
    }

    masterSongName.innerText = songs[songIdx].songname;
    audioElement.src = `songs/${songIdx + 1}.mp3`;
    // songIdx.classList.remove('fa-circle-play');
    // songIdx.classList.add('fa-circle-pause');
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})


document.getElementById('previous').addEventListener('click', () => {

    if (songIdx <= 0) {
        songIdx = 0;
    }

    else {
        songIdx -= 1;
    }

    masterSongName.innerText = songs[songIdx].songname;
    audioElement.src = `songs/${songIdx + 1}.mp3`;
    // songIdx.classList.remove('fa-circle-play');
    // songIdx.classList.add('fa-circle-pause');
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})

masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;

        songItemPlay[songIdx].classList.remove("fa-circle-play");
        songItemPlay[songIdx].classList.add("fa-circle-pause");
    }

    

    else {
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;

        songItemPlay[songIdx].classList.remove("fa-circle-pause");
        songItemPlay[songIdx].classList.add("fa-circle-play");
    }


   
})

