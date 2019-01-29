window.__SAMPLE_EXTENSION_NAMESPACE__ = {
    getElementTree() {
        return {
            tagName: "body",
            children: this.getElementTreeForNode({ el: document.body })
        };

    },

    getElementTreeForNode({ el }) {
        const childList = [];

        const treeWalker = document.createTreeWalker(
            el,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode(node) {
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );

        let node = treeWalker.firstChild();
        while(node) {
            childList.push({
                tagName: node.tagName.toLowerCase(),
                children: this.getElementTreeForNode({ el: node })
            });
            node = treeWalker.nextSibling();
        }

        return childList;
    }
};
