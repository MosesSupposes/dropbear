const { traverse } = require('./traverse');

const transform = (node) => {
  traverse(node, {
    CallExpression: {
      enter({ node }) {
        if (specialForms[node.name]) {
          specialForms[node.name](node);
        }
      },
    },
  });
  return node;
};

const specialForms = {
  define(node) {
    const [identifier, assignment] = node.arguments;
    node.type = 'VariableDeclaration';
    node.identifier = identifier;
    node.assignment = assignment;
    delete node.name;
    delete node.arugments;
  },
};

module.exports = { specialForms, transform };
