var genefile;

function checkOption(osel)
{
	var gene = osel.options[osel.selectedIndex].value;
	genefile = gene + '.json';

fetch(genefile, {mode: 'no-cors'})
  .then(function(res) {
    return res.json()
  }).then(function(data) {
    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),

      boxSelectionEnabled: false,
      autounselectify: true,

      layout: {
        name: 'grid'
      },

      style: [
        {
          selector: 'node',
          style: {
			'content': 'data(id)',
			'text-valign':'center',
			'text-halign':'center',
            'background-color': 'grey'
          }
        },
	  
        {
          selector: 'edge',
          style: {
			'content': 'data(weight)',
            'curve-style': 'haystack',
			'target-arrow-shape': 'triangle',
            'haystack-radius': 0,
            'width': 3,
            'opacity': 0.5,
            'line-color': 'grey'
          }
        }
      ],

      elements: data,
	  
	  layout: {
        name: 'concentric',
        concentric: function( node ){
          return node.degree();
        },
        levelWidth: function( nodes ){
          return 2;
        }
	  }
    });
  })
  };
