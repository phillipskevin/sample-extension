const updateButton = document.querySelector("button");
const treeContainer = document.querySelector("div");

const createTreeDOM = (node, spacer = "") => {
    const container = document.createElement("div");

    if (node.children.length === 0) {
        const tag = document.createElement("p");
        tag.innerHTML = `${spacer}&lt;${node.tagName}&gt;&lt;/${node.tagName}&gt;`;

        container.appendChild(tag);
    } else {
        const openingTag = document.createElement("p");
        openingTag.innerHTML = `${spacer}&lt;${node.tagName}&gt;`;

        container.appendChild(openingTag);

        for (let child of node.children) {
            container.appendChild(
                createTreeDOM(child, `${spacer}&nbsp;&nbsp;&nbsp;&nbsp;`)
            );
        }

        const closingTag = document.createElement("p");
        closingTag.innerHTML = `${spacer}&lt;/${node.tagName}&gt;`;

        container.appendChild(closingTag);
    }

    return container;
};

const updateDOM = (tree) => {
    treeContainer.innerHTML = "";
    treeContainer.appendChild( createTreeDOM(tree) );
};

const update = () => {
    chrome.devtools.inspectedWindow.eval(
        "window.__SAMPLE_EXTENSION_NAMESPACE__.getElementTree()",
        {},
        (result, exception) => {
            if (exception) {
                return;
            }

            updateDOM(result);
        }
    );
};

// set default data
update();

// update data when update button is clicked
updateButton.addEventListener("click", update);
