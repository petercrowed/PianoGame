const notes = {
  // Lower octave.
  90: 'C2',
  83: 'C#2',
  88: 'D2',
  68: 'D#2',
  67: 'E2',
  86: 'F2',
  71: 'F#2',
  66: 'G2',
  72: 'G#2',
  78: 'A2',
  74: 'A#2',
  77: 'B2',
  // Upper octave.
  81: 'C3',
  50: 'C#3',
  87: 'D3',
  51: 'D#3',
  69: 'E3',
  82: 'F3',
  53: 'F#3',
  84: 'G3',
  54: 'G#3',
  89: 'A3',
  55: 'A#3',
  85: 'B3',

  73: 'C4',
  57: 'C#4',
  79: 'D4',
  48: 'D#4',
  80: 'E4'


};

var autoFilter = new Tone.AutoFilter({
  frequency: 1,
  type: "sine",
  depth: 1,
  baseFrequency: 200,
  octaves: 2.6,
  filter: {
    type: "lowpass",
    rolloff: -12,
    Q: 1
  }
}).toMaster();

var dist = new Tone.Distortion().toMaster();

var synth = new Tone.PolySynth({
  polyphony: 4,
  volume: 0,
  detune: 0,
  voice: Tone.Synth,

  oscillator: {
    type: 'triangle8'
  },
  envelope: {
    attack: 0,
    decay: 1,
    sustain: 0.4,
    release: 4
  }
});
// dist.wet.value = 0.5;
// dist.wet.rampTo(1, 3);

var tones = ["C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
  "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
  "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
  "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
  "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6",
];
$(document).ready(function() {
  //Switch Slider
  if ($('#switch').is(':checked') == false) {
    $('#list1 li')
      .mousedown(function(e) {
        e = e || window.event;
        var ul = $(this).parent();
        var index = ul.children().index(this);

        $('.foo').myfunction(index);
      })
      .mouseup(function(e) {
        synth.triggerRelease();
      });
  }

  //Night Mode
  $("p").click(function() {
    if ($('#night').is(':checked') == true) {
      $("body").css("background", "#888");

    }
  });


  $("p").click(function() {
    if ($('#night').is(':checked') == false) {

      $("body").removeAttr('style');
    }
  });



  //knob


  $("#slider2").roundSlider({
    min: -20,
    max: 20,

    radius: 80,
    width: 14,
    handleSize: "24,12",
    handleShape: "square",
    sliderType: "min-range",
    value: 0
  });

  var value2 = 0;
$("#list1 li, #slider2" ).hover(function() {
  value2= $("#slider2").roundSlider("option", "value");
  synth.set({

    "volume": value2

  });
});


  $("#detune").roundSlider({
    min: -80,
    max: 80,

    radius: 80,
    width: 14,
    handleSize: "24,12",
    handleShape: "square",
    sliderType: "min-range",
    value: 0
  });

  var detuneValue = 0;
$("#list1 li, #detune").hover(function() {
  detuneValue= $("#detune").roundSlider("option", "value");
  console.log(detuneValue);
  synth.set({

    "detune": detuneValue

  });
});


$("#envelopeAttack").roundSlider({
  min: 0,
  max: 10,

  radius: 80,
  width: 14,
  handleSize: "24,12",
  handleShape: "square",
  sliderType: "min-range",
  value: 2
});

$("#decay").roundSlider({
  min: 0,
  max: 2,
  step : 0.1,
  radius: 80,
  width: 14,
  handleSize: "24,12",
  handleShape: "square",
  sliderType: "min-range",
  value: 0
});

$("#sustain").roundSlider({
  min: 0,
  max: 2,
  step : 0.1,
  radius: 80,
  width: 14,
  handleSize: "24,12",
  handleShape: "square",
  sliderType: "min-range",
  value: 0.4
});

$("#release").roundSlider({
  min: 0,
  max: 4,
  step : 0.1,
  radius: 80,
  width: 14,
  handleSize: "24,12",
  handleShape: "square",
  sliderType: "min-range",
  value: 4
});
var envelopeAttackValue= 2;
var decayValue= 0;
var sustainValue= 0.4;
var releaseValue= 4;
$("#list1 li, #decay, #envelopeAttack , #sustain, #release" ).hover(function() {

envelopeAttackValue = $("#envelopeAttack").roundSlider("option", "value");
decayValue = $("#decay").roundSlider("option", "value");
sustainValue = $("#sustain").roundSlider("option", "value");
releaseValue = $("#release").roundSlider("option", "value");
synth.set({
  envelope: {
    attack: envelopeAttackValue,
    decay: decayValue,
    sustain: sustainValue ,
    release: releaseValue
}
});
});


  //Swwitch Slider Off
  $('#list1 li')
    .hover(function(e) {
      if ($('#switch').is(':checked')) {

        var whiteKeyName = ".white." + notes[e.keyCode];

        var blackKeyName = ".black." + notes[e.keyCode];

        $(whiteKeyName).toggleClass("whiteActive");

        e = e || window.event;
        var ul = $(this).parent();
        var index = ul.children().index(this);

        $('.foo').myfunction(index);
      }
    }, function() {
      var ul = $(this).parent();
      var index = ul.children().index(this);
      synth.triggerRelease(tones[index]);

    });

  $.fn.myfunction = function(index) {
    synth.toMaster();
    synth.triggerAttack(tones[index]);
  };


  var mult = false,
    prev = 0;

  $(document)
    .keydown(function(e) {
      var whiteKeyName = ".white." + notes[e.keyCode];

      var blackKeyName = ".black." + notes[e.keyCode];
      substring = "#";
      var newBlack = blackKeyName.replace("#", "is");

      if (!mult) {
        mult = true;
        prev = e.which;

      } else if (prev != e.which) {
        mult = false;
      } else {
        return false;
      }

      $.fn.keyCode = function() {


        $(whiteKeyName).toggleClass("whiteActive");


        $(newBlack).toggleClass("blackActive");
        const note = notes[e.keyCode];

        synth.toMaster();
        synth.triggerAttack(notes[e.keyCode]);

      }

      $('.foo').keyCode();

    })
    .keyup(function(e) {
      var whiteKeyName = ".white." + notes[e.keyCode];
      $(whiteKeyName).removeClass("whiteActive");

      var blackKeyName = ".black." + notes[e.keyCode];
      substring = "#";
      var newBlack = blackKeyName.replace("#", "is");

      $(newBlack).removeClass("blackActive");
      synth.triggerRelease(notes[e.keyCode]);
    });


});
