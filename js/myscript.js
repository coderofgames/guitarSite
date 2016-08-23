
function init() {
  var container = $("#container");

  // Display preset chords (open chords)
 /* for (var i = 0; i < chord_chart.length; ++i) {
    var section_struct = chord_chart[i];
    var section = createSectionElement(section_struct);

    for (var j = 0; j < section_struct.chords.length; ++j) {
      section.append(createChordElement(section_struct.chords[j]));
    }

    container.append(section);
  }

  // Display shape chords for all keys
  var keys_E = ["F", "F#", "Gb", "G", "G#", "Ab", "A", "A#", "Bb", "C"];
  var keys_A = ["C#", "Db", "D", "D#", "Eb", "F", "F#", "Gb", "G"];

  var shapes_E = [
    "M E", "m E", "7 E", "m7 E", "M7 E", "m7b5 E", "dim E",
    "sus4 E", "7sus4 E", "13 E"];
  var shapes_A = [
    "M A", "m A", "7 A", "m7 A", "M7 A", "m7b5 A", "dim A",
    "sus2 A", "sus4 A", "7sus4 A", "9 A", "7b9 A", "7#9 A", "13 A"];

  createShapeChart(keys_E, container, shapes_E, "E");
  createShapeChart(keys_A, container, shapes_A, "A");*/
function draw_chord(){
var paper = Raphael(100, 1000, 800, 800);
var chord = new ChordBox(paper, 60, 60);
    chord.setChord([[1,"x"],[2, 4], [3, 3], [4,1], [5,0],[6, "x"]], 7);
chord.draw();
}
// Draw an open D7
/*chord.setChord(
"[ [1, 2], [2, 1], [3, 2], [4, 0], [5, 'x'], [6, 'x']]"
);*/

    var notes  =     ["a","a#","b","c","c#","d","d#","e","f","f#","g","g#"];
//    var n_nums[] = {1,   2,   3,  4,  5,   6,  7,   8,  9,  10,  11, 12 };
    
    var count_from_notes = [7,2,10,5,0,7];//[7,0,5,11,2,7];
    var count_from_notes2 = [7,0,5,10,2,7];
    
    var note_circle_radius = 15.5;
    var note_font_size = 24/17.5 * note_circle_radius;
    
    
    function compute_note(string, fret)
    { 
        var note_count = count_from_notes[string-1]; // base 3
        
        for( var i = 0; i < fret; i++ )
        {
            note_count++;
            if( note_count > 11 )
            {
                note_count = 0;
            }
        }
        
        return notes[note_count];
    }    
    
    function compute_note2(string, fret)
    { 
        var note_count = count_from_notes2[string-1]; // base 3
        
        if( fret <= 0 ) return notes[note_count];
        
        for( var i = 0; i < fret; i++ )
        {
            
            note_count++;
            if( note_count > 11 )
            {
                note_count = 0;
            }
        }
        
        return notes[note_count];
    }    

    /*
chord.setChord([[2, 3], [3, 3], [4, 3], [6, "x"]], 5,
         [{from_string: 5, to_string: 1, fret: 1}]);
         */



 

    
    
   
    var built_up_text =""; //+="                                          \n <br>";
    built_up_text += compute_note(6,7) +","+compute_note(5,5) +","+compute_note(4,5) +","+
        compute_note(3,6) +","+compute_note(2,6) +","+compute_note(1,6);
    
    
    
    $("#text").append("<div style='height:10px'></div>");
    
    
    $("#text").append(built_up_text);
    
    $("#text").append("<div style='height:10px'></div>");
    
    var mod_12 = 26 % 12;
    
    function compute_note_mod(string, f)
    {
        var base_note_of_string = count_from_notes[string-1]
        var val = base_note_of_string + f;
        var val_mod = (val) % 12;
        
        if (val_mod == 0 ) 
            return notes[val];
        else return notes[val_mod];
    }
    
    function dec2bin(dec){
        return (dec >>> 0).toString(2);
    }      
    
    
    built_up_text = "";
    built_up_text += compute_note_mod(2, 6);
    $("#text").append(built_up_text);
    
    $("#text").append("<div style='height:10px'></div>");
    
    function string_inverse(string)
    {
        return 7-string;
    }
    
    function note_from_base(string, fret)
    {
       // if( string ==1 ) fret = fret - 1;
        var notes_string = string_inverse(string);
        var numberical_note = notes_string * 5 + fret;
        if( notes_string >= 4 )
            return numberical_note - 1;
        else
            return numberical_note;// compute_note_mod(1, numerical_note + fret );
    }
    
    built_up_text = "";
    built_up_text +=  string_inverse( 1) + "   numerical note: " + note_from_base(1,6) + "   letter: " + compute_note_mod(6, note_from_base(1,6)-1 );
    $("#text").append(built_up_text);    

    
    var bit_field = [0,0,0,0,0,0];
    
    
    

   var scale_length = 2550;
   var fret_scale_constant = 17.817;
   var render_thickness_of_string = 3;
    
    function drawStrings(paper, y_offset)
    {
            var numstrings = 6;
            for( i = 0; i < numstrings; i++)
            {
                var position = (i*50)+20 + y_offset;
                paper.rect(50, position, scale_length / 1.3, render_thickness_of_string).attr({fill:"#000000"});
            }
     }
        
        function drawFrets(paper, y_offset)
        {
            var numfrets = 27;
            var local_scale_length = scale_length / 100;
            var last_position = local_scale_length / fret_scale_constant;

            for( i = 0; i < numfrets; i++)
            {  
                var currentFret = i+1;
                var pos2 = local_scale_length - local_scale_length/ Math.pow( 2,(i/12 ));
                
                paper.rect(pos2*85 +100, 10+y_offset, 5, 275).attr({fill:"#000000"});
                
                if( i == 0)
                {
                    paper.rect(pos2*85 +95, 10+y_offset, 10, 275).attr({fill:"#FFFFFF"});    
                }
            }
        }
    
        function fretboard_X(fret, fret_thickness_over2)
        {
            var local_scale_length = scale_length / 100;
            var pos2 = local_scale_length - local_scale_length/ Math.pow( 2,(fret/12 ));

            var pos3 =local_scale_length - local_scale_length/ Math.pow( 2,((fret-1)/12 ));

            return (  pos2 - (pos2-pos3  )/2)*85 +100 + fret_thickness_over2;
             
            
        }
    
        function fretboard_Y(string, y_offset)
        {
            return 6*50-(string *50)+22.5 + y_offset;  
        }
        
        function plotPosition(string, fret, col, paper, y_offset )
        {
            
            var fret_thickness_over2 =2.5;

            var x_pos = fretboard_X(fret -1, fret_thickness_over2);
            var y_pos = fretboard_Y(string, y_offset);
            
            if( fret == -5 )
            {
                paper.text(97.25+ fret_thickness_over2, y_pos, "X").attr({'stroke': 2,'font-size':38,"font-family":"Arial Black",'fill':"#FF0000"});
            }
            else if (fret-1 <= 0)
            {
                var circle = paper.circle(97.25 + fret_thickness_over2, y_pos, note_circle_radius, note_circle_radius);
                circle.attr({fill: col, stroke: '#f00'});
            }
            else
            {
                var circle = paper.circle(x_pos, y_pos, note_circle_radius, note_circle_radius);
                circle.attr({fill: col, stroke: '#ddd'});
            
            }
        }
    
        function plotPositionChord(string, fret, col, paper, y_offset, bit_chord )
        {
            var fret_thickness_over2 =2.5;

            var x_pos = fretboard_X(fret -1, fret_thickness_over2);
            var y_pos = fretboard_Y(string, y_offset);
            
            if (fret-1 <= 0)
            {
                bit_chord[string-1] |= 1 << (fret-1);
                
                var circle = paper.circle(97.25 + fret_thickness_over2, y_pos, note_circle_radius, note_circle_radius);
                circle.attr({fill: col, stroke: '#f00'});
            }
            else
            {
                bit_chord[string-1] |= 1 << (fret -1);
                
                var circle = paper.circle(x_pos, y_pos, note_circle_radius, note_circle_radius);
                circle.attr({fill: col, stroke: '#ddd'});
            
                
            }
        }    
    
        function plotPositionTextOnFretboard(string, fret, col, paper, y_offset )
        {
            var fret_thickness_over2 =2.5;
          
            var x_pos = fretboard_X(fret -1, fret_thickness_over2);
            var y_pos = fretboard_Y(string, y_offset);
            
            if( fret == -5 )
            {
                paper.text(97.25+ fret_thickness_over2, y_pos, "X").attr({'stroke': 2,'font-size':38,"font-family":"Arial Black",'fill':"#FF0000"});
            }
            else if (fret-1 <= 0)
            {
                paper.text(97.25 + fret_thickness_over2, y_pos, notes[count_from_notes[6-string]].toUpperCase()).attr({fill: '#ffffff','font-size':note_font_size,"font-family":"arial"});
                
            }
            else
            {
                fret = fret -1;
                paper.text(x_pos, y_pos, compute_note2(string, fret).toUpperCase()).attr({fill: '#ffffff','font-size':note_font_size,"font-family":"arial"}); 
            }
        }   
        function plotFretText( fret, paper, y_offset )
        { 
            var fret_thickness_over2 =2.5;
           
            var y_pos= 22.5;
            
            var x_pos = fretboard_X(fret, fret_thickness_over2);
            
            if (fret-1 <= 0)
            {
                paper.text(x_pos, y_pos, fret.toString()).attr({fill: '#ff0000'});
            }
            else
            {
                paper.text(x_pos, y_pos, fret.toString()).attr({fill: '#ff0000','font-size':24,"font-family":"arial"});
            }
        }    
    
    
        function plot_text_for_frets(paper,y_offset)
        {
            plotFretText( 3, paper, y_offset );
            plotFretText( 5, paper, y_offset );
            plotFretText( 7, paper, y_offset );
            plotFretText( 10, paper, y_offset );
            plotFretText( 12, paper, y_offset );
            plotFretText( 15, paper, y_offset );
            plotFretText( 17, paper, y_offset );
            plotFretText( 19, paper, y_offset );        
            plotFretText( 22, paper, y_offset );
            plotFretText( 24, paper, y_offset );
          //  plotText( 27, paper, y_offset );
        }

                    
               
        
        function plot_note_in_all_positions(num, col, paper, y_offset)
        {
            for(i = 0; i < 6; i++)
            {
                for( j = 1; j < 27; j++)
                {
                    var note=0;
                    note = note_from_base(string_inverse(i), j) 
                     
                    if( note === num )
                    {
                        plotPosition((i+1),j, col,paper,y_offset);
                        
                        bit_field[i] |= 1 << (j-1);
                    }
                }
            }
        }
    
        function plot_bitfield(bitfield, col, paper, y_offset, hack_pentatonic_mode=false)
        {
            for(i = 0; i < 6; i++)
            {
                //var this_string_base = count_from_notes[string_inverse(i+1)];
                if( hack_pentatonic_mode == false )
                {
                    for( j = 1; j < 27; j++)
                    {
                        if( bitfield[i] & (1 << (j-1)))
                        {

                            plotPosition((i+1),j, col,paper,y_offset);
                            plotPositionTextOnFretboard(i+1,j,col,paper,y_offset);
                        }

                    }
                }
                else
                {
                    for( j = 0; j < 27; j++)
                    {
                        if( bitfield[i] & (1 << (j)))
                        {
                            j=j+1;

                            plotPosition((i+1),j, col,paper,y_offset);
                        }

                    }                    
                }
            }
        }    
    
    function plot_fretboard(flags, div, bflamenco)
    {
        var paper = new Raphael(document.getElementById(div),1800,400);

        y_offset = 50;

        var rect = paper.rect(0, y_offset-10, 1800,320);
        rect.attr("fill", "#F5DEB3");
        rect.attr("stroke", "#F5DEB3");
        
    
    
        drawStrings(paper, y_offset);
        drawFrets(paper, y_offset);    
        plot_text_for_frets(paper,y_offset);
    
      //  plotPosition(6, 6 );
        var num_note_2 = 10;
       // plot_note_in_all_positions(10);
       // var key = -4;
        
        var Ionian = 0;
        var Dorian = 2;
        var Phrygian = 4;
        var Lydian = 5;
        var Mixolydian = 7 ;
        var Aeolian = 9 ;
        var Locrian = 11;
        
        //var mode = 2; // dorian
        var mode = Ionian; // phrygian
        //var mode = 5; // lydian
        //var mode = 7; // Mixolydian
        //var mode = 9; // aeolian
        //var mode = 11; // locrian
       
       
           if( flags == 0)
           {
                var key =1;
                key = key - mode ;
                for( octave = 0; octave < 5; octave++){
                    plot_note_in_all_positions(key + 12*( octave), '#000',paper,y_offset);
                    plot_note_in_all_positions(key + 12*( octave)  +  4, '#050',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave +  7, '#00f',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave -1, '#f00',paper,y_offset);
                 /*   plot_note_in_all_positions(key + 12*( octave)+ 1, '#000',paper,y_offset);
                    plot_note_in_all_positions(key + 12*( octave)  +  3, '#000',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave +  5, '#000',paper,y_offset);

                    plot_note_in_all_positions(key + 12*octave  +  6, '#000',paper,y_offset);

                    plot_note_in_all_positions(key + 12*octave  +  8, '#0f0',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave  +  9, '#f00',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave  +  10, '#000',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave  +  12, '#000',paper,y_offset);*/
                    }
           }
           else  if( flags == 1)
           {
               var key =-7;
               key = key - mode ;
                for( octave = 0; octave < 6; octave++)
                {
                     /*           plot_note_in_all_positions(key + 12*( octave), '#000',paper,y_offset);
                    plot_note_in_all_positions(key + 12*( octave)  +  4, '#050',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave +  7, '#00f',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave -1, '#f00',paper,y_offset);*/
                    plot_note_in_all_positions(key + 12*( octave)+ 1, '#000',paper,y_offset);
                    plot_note_in_all_positions(key + 12*( octave)  +  3, '#000',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave +  5, '#000',paper,y_offset);

                    plot_note_in_all_positions(key + 12*octave  +  6, '#000',paper,y_offset);

                    if( bflamenco )
                    {
                        plot_note_in_all_positions(key + 12*octave  +  8, '#0f0',paper,y_offset);
                        plot_note_in_all_positions(key + 12*octave  +  9, '#f00',paper,y_offset);
                    }
                    else
                    {
                        plot_note_in_all_positions(key + 12*octave  +  8, '#000',paper,y_offset);
                    }
                    plot_note_in_all_positions(key + 12*octave  +  10, '#000',paper,y_offset);
                    plot_note_in_all_positions(key + 12*octave  +  12, '#000',paper,y_offset);
                }         
           }
            else  if( flags == 2)
            {
                plotPosition( 1, -5, '#000', paper, y_offset )
                plotPosition( 2, 4, '#000', paper, y_offset )
                plotPosition( 3, 3, '#000', paper, y_offset )
                plotPosition( 4, 0, '#000', paper, y_offset )
                plotPosition( 5, 2, '#000', paper, y_offset )
                plotPosition( 6, 0, '#000', paper, y_offset )
            }
    
    }
    
    var c_major_shape_chord = [0,3,2,0,1,0];
    var a_major_shape_chord = [0,0,2,2,2,0];
    var g_major_shape_chord = [3,2,0,0,0,3];
    var e_major_shape_chord = [0,2,2,1,0,0];
    var d_major_shape_chord = [0,0,0,2,3,2];    
    
    function plot_fretboard_chord_shape(flags, div, chord, root_fret, bit_chord)
    {
        root_fret = root_fret+1;
        var paper = new Raphael(document.getElementById(div),1800,400);

        y_offset = 50;

        var rect = paper.rect(0, y_offset-10, 1800,320);
        rect.attr("fill", "#F5DEB3");
        rect.attr("stroke", "#F5DEB3");
        
    
    
        drawStrings(paper, y_offset);
        drawFrets(paper, y_offset);    
        plot_text_for_frets(paper,y_offset);
    
      //  plotPosition(6, 6 );
        var num_note_2 = 10;
        
        plotPositionChord(1, root_fret+ chord[0], '#000', paper, y_offset, bit_chord );
      
        plotPositionChord(2, root_fret+ chord[1], '#000', paper, y_offset, bit_chord );
        plotPositionChord(3, root_fret+ chord[2], '#000', paper, y_offset, bit_chord );
        plotPositionChord(4, root_fret+ chord[3], '#000', paper, y_offset, bit_chord );
        plotPositionChord(5, root_fret+ chord[4], '#000', paper, y_offset, bit_chord );
        plotPositionChord(6, root_fret+ chord[5], '#000', paper, y_offset, bit_chord );        
    }
    

    
    
    function plot_fretboard_bitfield(flags, div, bitfield)
    {
        var paper = new Raphael(document.getElementById(div),1800,400);

        y_offset = 50;

        var rect = paper.rect(0, y_offset-10, 1800,320);
        rect.attr("fill", "#F5DEB3");
        rect.attr("stroke", "#F5DEB3");
        
    
    
        drawStrings(paper, y_offset);
        drawFrets(paper, y_offset);    
        plot_text_for_frets(paper,y_offset);
    
      //  plotPosition(6, 6 );
        var num_note_2 = 10;
        plot_bitfield(bitfield, '#000', paper, y_offset,false);
    }    
    
    function Two_guitar_bitfield_binary_and(bitf_1, bitf_2)
    {
        for( var i = 0; i < 6; i++ )
        {
            if( !( bitf_1[ i ] & bitf_2[ i ] ) )
            {
                return false;
            }
        }
        return true;
    }
    
    
   plot_fretboard(1,"fretboard",false);
 
    for( var i = 0; i < 6; i++ )
    {
        $("#bitfield_output").append(dec2bin(bit_field[i]) );
        $("#bitfield_output").append("<br>");
    }
  //  plot_fretboard_bitfield(flags, div, bitfield)
    
    plot_fretboard_bitfield(1,"fretboard2",bit_field); 
    
    for( var i = 0; i < 6; i++ )
    {
        $("#bitfield_numbers").append(bit_field[i]);
        $("#bitfield_numbers").append("<br>");
    }
    
    var bit_chord = [0,0,0,0,0,0];
    plot_fretboard_chord_shape(2,"fretboard3",c_major_shape_chord,2,bit_chord);
        
    for( var i = 0; i < 6; i++ )   
    {    
        bit_chord[i] = bit_chord[i] << 5; 
    }    
    
    if( Two_guitar_bitfield_binary_and( bit_field, bit_chord ) )
    {

        plot_fretboard_bitfield(1,"fretboard4",bit_chord);
        
    }
//draw_chord();
    
}

