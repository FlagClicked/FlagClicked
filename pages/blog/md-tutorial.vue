<template>
  <div class="margined">
    <h1>{{ title }}</h1>
    <h3>by {{ author.user }}</h3>
    <Renderer :content="page" />
  </div>
</template>
<script>
export default {
  head() {
    return {
      title: "Markdown Tutorial",
    };
  },
  data() {
    return {
      author: {
        user: "markverb1",
        scratch: "markverb1",
      },
      title: "Markdown Tutorial",
      page: `## Headings

To create a heading, add number signs (#) in front of a word or phrase. The number of number signs you use should correspond to the heading level. For example, to create a heading level three, use three number signs (e.g., ### My Header).

### Heading Best Practices

Markdown applications don’t agree on how to handle a missing space between the number signs (#) and the heading name. For compatibility, always put a space between the number signs and the heading name.
✔Do this
\`\`\`

# Here's a Heading

\`\`\`
❌Don't do this
\`\`\`
#Here's a Heading
\`\`\`

## Paragraphs

To create paragraphs, use a blank line to separate one or more lines of text.

### Paragraph Best Practices

✔Do this
\`\`\`
Don't put tabs or spaces in front of your paragraphs.
Keep lines left-aligned like this.
\`\`\`
❌Don't do this
\`\`\`
This can result in unexpected formatting problems.
Don't add tabs or spaces in front of paragraphs.
\`\`\`

## Line Breaks

To create a line break, end a line with two or more spaces, and then type return/enter.

### Line Break Best Practices

You can use two or more spaces (commonly referred to as “trailing whitespace”) for line breaks in nearly every Markdown application, but it’s controversial. It’s hard to see trailing whitespace in an editor, and many people accidentally or intentionally put two spaces after every sentence. For this reason, you may want to use something other than trailing whitespace for line breaks. Fortunately, there is another option supported by nearly every Markdown application: the
HTML tag.
For compatibility, use trailing white space or the
HTML tag at the end of the line.
✔Do this
\`\`\`
First line with two spaces after.
And the next line.
First line with the HTML tag after.
And the next line.
\`\`\`
❌Don't do this
\`\`\`
First line with a backslash after.
And the next line.
First line with nothing after.
And the next line.
\`\`\`

## Bold

To bold text, add two asterisks before and after a word or phrase. To bold the middle of a word for emphasis, add two asterisks without spaces around the letters.

## Italic

To italicize text, add one asterisk before and after a word or phrase. To italicize the middle of a word for emphasis, add one asterisk without spaces around the letters.

## Bold and Italic

To emphasize text with bold and italics at the same time, add three asterisks before and after a word or phrase. To bold and italicize the middle of a word for emphasis, add three asterisks without spaces around the letters.

## Ordered Lists

To create an ordered list, add line items with numbers followed by periods. The numbers don’t have to be in numerical order, but the list should start with the number one.

### Ordered List Best Practices

Markdown applications don’t agree on how to handle a missing space between the number signs (#) and the heading name. For compatibility, always put a space between the number signs and the heading name.
✔Do this
\`\`\`

1. First item
2. Second item
   \`\`\`
   ❌Don't do this
   \`\`\`

1) First item
2) Second item
   \`\`\`

## Unordered Lists

To create an unordered list, add dashes (-) in front of line items. Indent one or more items to create a nested list.

## Images

To add an image, add an exclamation mark (!), followed by alt text in brackets, and the URL to the image asset in parentheses. You can optionally add a title after the URL in the parentheses.
\`\`\`
![Sample image](https://u.cubeupload.com/markverb1/INPe0M.jpg "Sample Image")
\`\`\`

## Links

Links are very similar as images. You can make them exactly like you would for an image, but without the exclamation mark (!) and also no optioanl title.
\`\`\`
[Scratch](https://scratch.mit.edu/)
\`\`\`

## Embedding

You can create an inline embed by surounding text in backticks. For example:
\`\`\`
\`Text\`
\`\`\`
You can create mutiline embeds by using three backticks instead of one.

## Escaping Characters

To display a literal character that would otherwise be used to format text in a Markdown document, add a backslash (\\) in front of the character.

### Characters you can escape

\`\`\`
\` \*
\_
{ }
[ ]
< >
( )

#

## +

.
!
|
\`\`\`
**_Everything you see above are all basic things you can do in markdown._**
However one thing we have added into our markdown, are scratchblocks embeds. You can make them like this:

${/* an invisable character was placed below to make the backticks show. */ ""}
\`\`\`
\`\`‎\`scratchblocks
when gf clicked
move (10) steps
set [var v] to (100)
\`\`‎\`
\`\`\`

which outputs:
\`\`\`scratchblocks
when gf clicked
move (10) steps
set [var v] to (100)
\`\`\`

Anyway, that's all for now! We'll add more if we hear any feedback from you!
`,
    };
  },
};
</script>
