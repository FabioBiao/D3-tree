import { Component, OnInit, NgZone, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreeComponent implements OnInit {
  constructor(private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      let data = {
        name: 'Top Level',
        children: [
          {
            name: 'Level 2: A',
            children: [{ name: 'Son of A' }, { name: 'Daughter of A' }]
          },
          { name: 'Level 2: B' }
        ]
      };

      const that = this;

      // set the dimensions and margins of the graph
      var width = 600;
      var height = 500;

      // append the svg object to the body of the page
      var svg = d3
        .select('#treediv')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(40,0)'); // bit of margin on the left = 40

      // Create the cluster layout:
      var cluster = d3.cluster().size([height, width - 100]); // 100 is the margin I will have on the right side

      // Give the data to this cluster layout:
      var root = d3.hierarchy(data, function(d: any) {
        return d.children;
      });
      cluster(root);

      // Add the links between nodes:
      svg
        .selectAll('path')
        .data(root.descendants().slice(1))
        .enter()
        .append('path')
        .attr('d', function(d: any) {
          return (
            'M' +
            d.y +
            ',' +
            d.x +
            'C' +
            (d.parent.y + 50) +
            ',' +
            d.x +
            ' ' +
            (d.parent.y + 25) +
            ',' +
            d.parent.x + // 50 and 150 are coordinates of inflexion, play with it to change links shape
            ' ' +
            d.parent.y +
            ',' +
            d.parent.x
          );
        })
        .style('fill', 'none')
        .attr('stroke', '#ccc');

      // Add a text
      svg
        .selectAll('g')
        .data(root.descendants())
        .enter()
        .append('foreignObject')
        .text(function(d: any) {
          if (d) {
            return d.data.name;
          } else {
            return '';
          }
        })
        .attr('transform', function(d: any) {
          return 'translate(' + (d.y - 10) + ',' + (d.x + 5) + ')';
        })
        .attr('width', function(d) {
          return '100px';
        })
        .attr('height', function(d) {
          return '20px';
        });

      // Add a circle for each node.
      svg
        .selectAll('g')
        .data(root.descendants())
        .enter()
        .append('circle')
        .attr('transform', function(d: any) {
          return 'translate(' + d.y + ',' + d.x + ')';
        })
        .attr('r', 7)
        .style('fill', '#69b3a2')
        .attr('stroke', 'black')
        .style('stroke-width', 2)
        .on('click', function(d: any) {
          return that.click(d);
        });
    });
  }

  // Toggle children on click.
  click(d: any) {
    console.log(this);
    console.log(d);
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    this.updateGraph(d);
  }

  collapse(d: any) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(function(line) {
        this.collapse(line);
      });
      d.children = null;
    }
  }

  updateGraph(d) {
    console.log('test' + d);
  }
}
