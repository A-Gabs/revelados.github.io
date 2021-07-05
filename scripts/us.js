var audio = new Audio();
      audio.src = "http://k003.kiwi6.com/hotlink/0gendnopux/Supreme_Noise_-_ACE_Original_Mix_.mp3";
      audio.controls = true;
      audio.loop = true;
      audio.autoplay = false;

      var canvas, ctx, source, context, analyser, fbc_array, bars, bar_x, bar_width, bar_height;

      window.addEventListener("load", initMp3Player, false);

      function initMp3Player(){
        document.getElementById('audio_box').appendChild(audio);

        context = new AudioContext();
        analyser = context.createAnalyser();

        canvas = document.getElementById('analyzer_render');

        ctx = canvas.getContext('2d');

        source = context.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(context.destination);
        frameLooper();
      }

      function frameLooper(){
        window.requestAnimationFrame(frameLooper);

        fbc_array = new Uint8Array(analyser.frequencyBinCount);

        analyser.getByteFrequencyData(fbc_array);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#83F442";
        bars = 100;

        for(var i = 0; i < bars; i++){
          bar_x = i * 3;
          bar_width = 2;
          bar_height = -(fbc_array[i] / 2);
          ctx.fillRect(bar_x, canvas.height, bar_width, bar_height);
        }
      }