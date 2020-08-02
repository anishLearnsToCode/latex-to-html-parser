# Latex To HTML Parser  
As the name clearly indicates this is a parser that converts valid LaTeX to HTML code.

This is achieved by creating a parse tree of the entered LaTeX text and then the tree is
parsed and converted into valid HTML dom elements part of a single rooted dom node. This single 
node also uses the union of custom fonts to obtain all the symbols available in TeX as 
an SVG (so that the output is crystal clear on all displays).

These SVG fonts are stored across multiple files and their union is used to achieve 
the desired result.

__Author__: Anish Sachdeva (@anishLearnsToCode)


Distributed under the MIT Licence.

## Examples
### Converting simple mathematical equation sin LaTeX format
```tex
x^2
```

__Output__

x<sup>2</sup>

### Using the Roman Family text
 ```latex
$\textrm{II}$
 ```

__Output__
````text
II
````
