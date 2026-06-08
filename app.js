/**
 * NexusOS Runtime Application Core Logic Engine
 * Architecture Framework Matrix Layout Architecture State Manager
 */

let systemState = {
    documents: [],
    activeDocumentId: null,
    systemTheme: "dark",
    customForgeColors: null,
    kanbanCards: [] // Object schema: { id, documentId, text, status }
};

const DEFAULT_COVER_THEME = "linear-gradient(135deg, #4c49ed 0%, #0c0a21 100%)";

// Initialize Boot Routine Pipeline Channels
window.addEventListener("DOMContentLoaded", () => {
    extractStateFromLocalStorage();
    executeGlobalThemePaint();
    renderSidebarDocumentsMenu();
    loadTargetDocumentIntoCanvas();
    setupOperationalGlobalEventListeners();
});

// Cache Synchronizations pipelines
function extractStateFromLocalStorage() {
    const localizedPayload = localStorage.getItem("NEXUS_WORKSPACE_DATA");
    if (localizedPayload) {
        try {
            systemState = JSON.parse(localizedPayload);
        } catch (error) {
            console.error("Local state parsing compilation structural conflict.", error);
        }
    }

    // Fallback Initial Base Document Configuration Array if empty directory detected
    if (!systemState.documents || systemState.documents.length === 0) {
        const welcomeDocId = "doc-alpha-prime";
        systemState.documents = [{
            id: welcomeDocId,
            title: "Welcome to NexusOS 🚀",
            content: "<h1>NexusOS Core Interactive Space</h1><p>This is your multi-tier unified documentation node workspace terminal asset. Use these structural shortcuts inside this rich editing surface sandbox container:</p><ul><li>Type <b>/</b> to trigger the floating structural element creation menu blocks interface framework.</li><li>Type <b>[[</b> to invoke internal relational bidirectional cross-linking node anchors.</li><li>Drop custom audio or image assets straight into this canvas frame.</li></ul><hr><p>Press <b>Cmd + K</b> or <b>Ctrl + K</b> anywhere to scan your database instantly via the Fuzzy Search Command Engine.</p>",
            date: new Date().toLocaleDateString(),
            cover: DEFAULT_COVER_THEME
        }, {
            id: "doc-sample-target",
            title: "Interlinked Target Hub 🎯",
            content: "<h2>Target Node Connected</h2><p>You have successfully successfully bridged across the bidirectional document link mapping framework protocol.</p>",
            date: new Date().toLocaleDateString(),
            cover: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
        }];
        
        systemState.kanbanCards = [
            { id: "k-1", documentId: welcomeDocId, text: "Review the system configuration variables", status: "todo" },
            { id: "k-2", documentId: welcomeDocId, text: "Map an interlinked wiki network architecture", status: "progress" }
        ];
        systemState.activeDocumentId = welcomeDocId;
    }
}

function commitSystemStateToMemory() {
    localStorage.setItem("NEXUS_WORKSPACE_DATA", JSON.stringify(systemState));
}

// Router Panel Switching View Engine Subroutines
function changeView(targetPanelId) {
    document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));
    document.querySelectorAll(".nav-button").forEach(b => b.classList.remove("active"));

    document.getElementById(`view-${targetPanelId}`).classList.add("active");
    const dynamicTriggerButton = document.querySelector(`.nav-button[data-target="${targetPanelId}"]`);
    if (dynamicTriggerButton) dynamicTriggerButton.classList.add("active");
}

// Sidebar Renderers Mapping Engine Loops
function renderSidebarDocumentsMenu() {
    const directoryContainer = document.getElementById("sidebar-documents-tree");
    directoryContainer.innerHTML = "";

    systemState.documents.forEach(doc => {
        const isCurrentActiveDoc = doc.id === systemState.activeDocumentId;
        const nodeRowElement = document.createElement("div");
        nodeRowElement.className = `doc-tree-item ${isCurrentActiveDoc ? 'active' : ''}`;
        nodeRowElement.setAttribute("onclick", `routeToActiveDocument('${doc.id}')`);

        nodeRowElement.innerHTML = `
            <div style="display:flex; align-items:center; gap:8px; overflow:hidden;">
                <i class="fa-regular fa-file-code" style="color:${isCurrentActiveDoc ? 'var(--accent)' : 'inherit'}"></i>
                <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:150px;">${doc.title || 'Untitled Node'}</span>
            </div>
            <button class="del-btn" onclick="purgeDocumentNodeInstance(event, '${doc.id}')"><i class="fa-solid fa-xmark"></i></button>
        `;
        directoryContainer.appendChild(nodeRowElement);
    });
}

// Workspace Document Selection Canvas Refresher Pipelines
function loadTargetDocumentIntoCanvas() {
    const currentDocObj = systemState.documents.find(d => d.id === systemState.activeDocumentId);
    if (!currentDocObj) return;

    document.getElementById("document-title-field").value = currentDocObj.title || "";
    const richCanvasElement = document.getElementById("rich-editor-canvas");
    richCanvasElement.innerHTML = currentDocObj.content || "";
    document.getElementById("meta-date-stamp").innerText = currentDocObj.date || new Date().toLocaleDateString();

    const bannerCoverFrame = document.getElementById("canvas-cover-banner");
    if (currentDocObj.cover && currentDocObj.cover.startsWith("data:image")) {
        bannerCoverFrame.style.backgroundImage = `url(${currentDocObj.cover})`;
    } else {
        bannerCoverFrame.style.backgroundImage = currentDocObj.cover || DEFAULT_COVER_THEME;
    }

    calculateRealtimeCanvasMetrics();
    renderKanbanMatrixBoard();
}

function routeToActiveDocument(documentId) {
    systemState.activeDocumentId = documentId;
    commitSystemStateToMemory();
    renderSidebarDocumentsMenu();
    loadTargetDocumentIntoCanvas();
    changeView("workspace");
}

function createNewDocument() {
    const rawUniqueId = "doc-" + Date.now();
    const newBlankDocumentNode = {
        id: rawUniqueId,
        title: "New Code Entry Node",
        content: "",
        date: new Date().toLocaleDateString(),
        cover: DEFAULT_COVER_THEME
    };

    systemState.documents.push(newBlankDocumentNode);
    systemState.activeDocumentId = rawUniqueId;
    commitSystemStateToMemory();
    renderSidebarDocumentsMenu();
    loadTargetDocumentIntoCanvas();
    changeView("workspace");
}

function purgeDocumentNodeInstance(event, targetDocId) {
    event.stopPropagation();
    if (systemState.documents.length <= 1) {
        alert("System operational safety constraint: Terminal must hold at least one valid root directory node path mapping.");
        return;
    }

    systemState.documents = systemState.documents.filter(d => d.id !== targetDocId);
    systemState.kanbanCards = systemState.kanbanCards.filter(c => c.documentId !== targetDocId);

    if (systemState.activeDocumentId === targetDocId) {
        systemState.activeDocumentId = systemState.documents[0].id;
    }

    commitSystemStateToMemory();
    renderSidebarDocumentsMenu();
    loadTargetDocumentIntoCanvas();
}

// Analytics Metrics Logic Engine Realtime Calculations
function calculateRealtimeCanvasMetrics() {
    const stringBodySource = document.getElementById("rich-editor-canvas").innerText || "";
    const cleanWordsArray = stringBodySource.trim().split(/\s+/).filter(w => w.length > 0);
    document.getElementById("global-word-counter").innerText = `Words: ${cleanWordsArray.length}`;
}

// Media Attachment Buffer Interceptions Subroutines
document.getElementById("hidden-cover-uploader").addEventListener("change", (e) => {
    const activeFile = e.target.files[0];
    if (!activeFile) return;

    const pipelineReader = new FileReader();
    pipelineReader.onload = function(eventResult) {
        const dataUrlStringResult = eventResult.target.result;
        document.getElementById("canvas-cover-banner").style.backgroundImage = `url(${dataUrlStringResult})`;
        
        const matchingDocNode = systemState.documents.find(d => d.id === systemState.activeDocumentId);
        if (matchingDocNode) {
            matchingDocNode.cover = dataUrlStringResult;
            commitSystemStateToMemory();
        }
    };
    pipelineReader.readAsDataURL(activeFile);
});

function clearActiveBannerCover() {
    document.getElementById("canvas-cover-banner").style.backgroundImage = DEFAULT_COVER_THEME;
    const matchingDocNode = systemState.documents.find(d => d.id === systemState.activeDocumentId);
    if (matchingDocNode) {
        matchingDocNode.cover = DEFAULT_COVER_THEME;
        commitSystemStateToMemory();
    }
}

document.getElementById("hidden-inline-media-picker").addEventListener("change", (e) => {
    const dynamicMediaFile = e.target.files[0];
    if (!dynamicMediaFile) return;

    const coreSystemFileReader = new FileReader();
    coreSystemFileReader.onload = function(eventProgressPayload) {
        const extractedDataUrl = eventProgressPayload.target.result;
        const outerMediaBlockWrapper = document.createElement("div");
        outerMediaBlockWrapper.className = "inline-embedded-media-box";
        outerMediaBlockWrapper.contentEditable = "false";

        const functionalPurgeButton = document.createElement("button");
        functionalPurgeButton.className = "media-purge-btn";
        functionalPurgeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        functionalPurgeButton.onclick = () => { outerMediaBlockWrapper.remove(); compileActiveCanvasContentState(); };

        if (dynamicMediaFile.type.startsWith("image/")) {
            const visualImageNode = document.createElement("img");
            visualImageNode.src = extractedDataUrl;
            outerMediaBlockWrapper.appendChild(visualImageNode);
        } else if (dynamicMediaFile.type.startsWith("audio/")) {
            const sonicAudioNode = document.createElement("audio");
            sonicAudioNode.src = extractedDataUrl;
            sonicAudioNode.controls = true;
            outerMediaBlockWrapper.appendChild(sonicAudioNode);
        }

        outerMediaBlockWrapper.appendChild(functionalPurgeButton);
        document.getElementById("rich-editor-canvas").appendChild(outerMediaBlockWrapper);
        compileActiveCanvasContentState();
    };
    coreSystemFileReader.readAsDataURL(dynamicMediaFile);
});

// Rich Text Event Capturing Processing Engine Pipelines
const textWritingAreaCanvas = document.getElementById("rich-editor-canvas");

textWritingAreaCanvas.addEventListener("input", () => {
    compileActiveCanvasContentState();
    calculateRealtimeCanvasMetrics();
});

function compileActiveCanvasContentState() {
    const activeDocNodeObject = systemState.documents.find(d => d.id === systemState.activeDocumentId);
    if (activeDocNodeObject) {
        activeDocNodeObject.content = textWritingAreaCanvas.innerHTML;
        commitSystemStateToMemory();
    }
}

document.getElementById("document-title-field").addEventListener("input", (e) => {
    const userTypedValue = e.target.value;
    const activeDocNodeObject = systemState.documents.find(d => d.id === systemState.activeDocumentId);
    if (activeDocNodeObject) {
        activeDocNodeObject.title = userTypedValue;
        commitSystemStateToMemory();
        renderSidebarDocumentsMenu();
    }
});

// Drag and Drop Integrated Core Systems Asset Trapping Pipeline Logic
textWritingAreaCanvas.addEventListener("dragover", (e) => e.preventDefault());
textWritingAreaCanvas.addEventListener("drop", (e) => {
    e.preventDefault();
    const droppedFileAsset = e.dataTransfer.files[0];
    if (!droppedFileAsset) return;

    const sandboxFlippedReaderPipeline = new FileReader();
    sandboxFlippedReaderPipeline.onload = function(ev) {
        const rawStringDataUrl = ev.target.result;
        const droppedElementBox = document.createElement("div");
        droppedElementBox.className = "inline-embedded-media-box";
        droppedElementBox.contentEditable = "false";

        const structuralKillBtn = document.createElement("button");
        structuralKillBtn.className = "media-purge-btn";
        structuralKillBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        structuralKillBtn.onclick = () => { droppedElementBox.remove(); compileActiveCanvasContentState(); };

        if (droppedFileAsset.type.startsWith("image/")) {
            const runtimeImg = document.createElement("img");
            runtimeImg.src = rawStringDataUrl;
            droppedElementBox.appendChild(runtimeImg);
        } else if (droppedFileAsset.type.startsWith("audio/")) {
            const runtimeAud = document.createElement("audio");
            runtimeAud.src = rawStringDataUrl;
            runtimeAud.controls = true;
            droppedElementBox.appendChild(runtimeAud);
        }

        droppedElementBox.appendChild(structuralKillBtn);
        textWritingAreaCanvas.appendChild(droppedElementBox);
        compileActiveCanvasContentState();
    };
    sandboxFlippedReaderPipeline.readAsDataURL(droppedFileAsset);
});

/**
 * -------------------------------------------------------------
 * EXTENDED HIGH-TIER CORE LOGIC IMPLEMENTATIONS MODULE ENGINE
 * -------------------------------------------------------------
 */

// Global Intercept Shortcuts Configuration Handler Key Triggers
let globalActiveSlashCursorIndex = null;
let activeWikiCursorIndex = null;

function setupOperationalGlobalEventListeners() {
    window.addEventListener("keydown", (e) => {
        // Intercept Search Hotkeys Combination: Cmd + K or Ctrl + K
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
            e.preventDefault();
            invokeCommandPaletteWindow(true);
        }
        if (e.key === "Escape") {
            invokeCommandPaletteWindow(false);
            shutdownFloatingPopups();
        }
    });

    // Subroutine Tracker inside content-editable sandbox area
    textWritingAreaCanvas.addEventListener("keyup", handleWritingCanvasKeyInterceptions);

    // Global Search Pipeline Typing Hook Input Logic
    document.getElementById("palette-search-input").addEventListener("input", (e) => {
        runFuzzySearchCalculationExecution(e.target.value);
    });
}

// Markdown Shortcuts Conversions & Modal Interceptors Engines Logic
function handleWritingCanvasKeyInterceptions(e) {
    const windowSelection = window.getSelection();
    if (!windowSelection.rangeCount) return;
    const focusRange = windowSelection.getRangeAt(0);
    const targetTextNode = focusRange.startContainer;
    
    if (targetTextNode.nodeType !== Node.TEXT_NODE) return;
    const stringDataBuffer = targetTextNode.textContent;

    // A. Real-time Native Inline Markdown Regex Transforms
    if (e.key === " ") {
        // Heading 1 Transformation: # 
        if (stringDataBuffer.startsWith("#\u00A0") || stringDataBuffer.startsWith("# ")) {
            executeBlockElementConversion("h1", targetTextNode);
            return;
        }
        // Heading 2 Transformation: ## 
        if (stringDataBuffer.startsWith("##\u00A0") || stringDataBuffer.startsWith("## ")) {
            executeBlockElementConversion("h2", targetTextNode);
            return;
        }
        // Unordered Bullet List Transformation: * if (stringDataBuffer.startsWith("*\u00A0") || stringDataBuffer.startsWith("* ")) {
            executeBlockElementConversion("ul", targetTextNode, true);
            return;
        }
        // Horizontal Dividers Transformation: ---
        if (stringDataBuffer.startsWith("---\u00A0") || stringDataBuffer.startsWith("--- ")) {
            executeBlockElementConversion("hr", targetTextNode);
            return;
        }
    }

    // B. Slash Command Pop-up Menu Engine Activation Trigger Block
    const cursorCaretIndexPosition = focusRange.startOffset;
    const precedingSubstringChunk = stringDataBuffer.slice(0, cursorCaretIndexPosition);
    const forwardSlashTokenIndex = precedingSubstringChunk.lastIndexOf("/");

    if (forwardSlashTokenIndex !== -1 && (forwardSlashTokenIndex === 0 || /\s/.test(precedingSubstringChunk[forwardSlashTokenIndex - 1]))) {
        globalActiveSlashCursorIndex = forwardSlashTokenIndex;
        displaySlashCommandMenuFloatingPopup(focusRange);
    } else {
        document.getElementById("slash-command-menu").style.display = "none";
    }

    // C. Bidirectional Interlinking Menu Activation (`[[`)
    const doubleBracketTokenIndex = precedingSubstringChunk.lastIndexOf("[[");
    if (doubleBracketTokenIndex !== -1 && (doubleBracketTokenIndex === 0 || /\s/.test(precedingSubstringChunk[doubleBracketTokenIndex - 1]))) {
        activeWikiCursorIndex = doubleBracketTokenIndex;
        displayWikiLinkSelectionFloatingPopup(focusRange);
    } else {
        document.getElementById("wiki-bi-link-menu").style.display = "none";
    }
}

function executeBlockElementConversion(htmlTagName, textNodeTarget, generateAsListItem = false) {
    const parentContainerElement = textNodeTarget.parentNode;
    if (htmlTagName === "hr") {
        parentContainerElement.innerHTML = "<hr><p><br></p>";
    } else if (generateAsListItem) {
        parentContainerElement.innerHTML = `<ul><li><br></li></ul>`;
    } else {
        parentContainerElement.innerHTML = `<${htmlTagName}>${parentContainerElement.innerText.replace(/^[#\s*:-]+/g, "")}</${htmlTagName}><p><br></p>`;
    }
    
    // Reset focus tracking nodes
    const structuralSelection = window.getSelection();
    const structuralRange = document.createRange();
    structuralRange.selectNodeContents(parentContainerElement);
    structuralRange.collapse(false);
    structuralSelection.removeAllRanges();
    structuralSelection.addRange(structuralRange);
    compileActiveCanvasContentState();
}

// Popup UI Positioning Subroutines
function displaySlashCommandMenuFloatingPopup(selectionRange) {
    const popupMenuEl = document.getElementById("slash-command-menu");
    const viewportBoundingRect = selectionRange.getBoundingClientRect();

    popupMenuEl.style.top = `${window.scrollY + viewportBoundingRect.bottom + 8}px`;
    popupMenuEl.style.left = `${window.scrollX + viewportBoundingRect.left}px`;
    popupMenuEl.style.display = "block";

    popupMenuEl.innerHTML = `
        <div class="popup-menu-item" onclick="injectElementFromSlashMenu('<h1>Header 1</h1>')"><i class="fa-solid fa-heading"></i> Heading Large</div>
        <div class="popup-menu-item" onclick="injectElementFromSlashMenu('<h2>Header 2</h2>')"><i class="fa-solid fa-heading"></i> Heading Medium</div>
        <div class="popup-menu-item" onclick="injectElementFromSlashMenu('<ul><li>List Item</li></ul>')"><i class="fa-solid fa-list"></i> Bulleted List Node</div>
        <div class="popup-menu-item" onclick="injectElementFromSlashMenu('<hr>')"><i class="fa-solid fa-minus"></i> Structural Divider</div>
    `;
}

function injectElementFromSlashMenu(rawHTMLString) {
    shutdownFloatingPopups();
    const activeTextSelection = window.getSelection();
    if (!activeTextSelection.rangeCount) return;
    const designRange = activeTextSelection.getRangeAt(0);
    
    // Wipe original slash character token node string mapping references
    const focusNode = designRange.startContainer;
    if (focusNode.nodeType === Node.TEXT_NODE) {
        const structuralRawValue = focusNode.textContent;
        focusNode.textContent = structuralRawValue.slice(0, globalActiveSlashCursorIndex);
    }

    const elementContainerNode = document.createElement("div");
    elementContainerNode.innerHTML = rawHTMLString;
    designRange.insertNode(elementContainerNode);
    compileActiveCanvasContentState();
}

function displayWikiLinkSelectionFloatingPopup(rangeContext) {
    const wikiPopupEl = document.getElementById("wiki-bi-link-menu");
    const boundingBoxCoordinates = rangeContext.getBoundingClientRect();

    wikiPopupEl.style.top = `${window.scrollY + boundingBoxCoordinates.bottom + 8}px`;
    wikiPopupEl.style.left = `${window.scrollX + boundingBoxCoordinates.left}px`;
    wikiPopupEl.style.display = "block";

    let builtMenuItemsListHTML = "";
    systemState.documents.forEach(doc => {
        builtMenuItemsListHTML += `
            <div class="popup-menu-item" onclick="executeWikiNodeLinkBinding('${doc.id}', '${doc.title.replace(/'/g, "\\'")}')">
                <i class="fa-solid fa-link"></i> ${doc.title}
            </div>
        `;
    });
    wikiPopupEl.innerHTML = builtMenuItemsListHTML;
}

function executeWikiNodeLinkBinding(targetDocId, targetDocTitle) {
    shutdownFloatingPopups();
    const targetedSelection = window.getSelection();
    if (!targetedSelection.rangeCount) return;
    const dynamicWorkingRange = targetedSelection.getRangeAt(0);
    const textualTargetNode = dynamicWorkingRange.startContainer;

    if (textualTargetNode.nodeType === Node.TEXT_NODE) {
        const dynamicContentString = textualTargetNode.textContent;
        textualTargetNode.textContent = dynamicContentString.slice(0, activeWikiCursorIndex);
    }

    const anchorNodeLinkElement = document.createElement("span");
    anchorNodeLinkElement.className = "wiki-anchor-link";
    anchorNodeLinkElement.innerText = `[[${targetDocTitle}]]`;
    anchorNodeLinkElement.contentEditable = "false";
    anchorNodeLinkElement.setAttribute("onclick", `routeToActiveDocument('${targetDocId}')`);

    dynamicWorkingRange.insertNode(anchorNodeLinkElement);
    
    // Append tracking placeholder spacing tail node elements to reset user focus state flow cleanly
    const safeSpacingTextNode = document.createTextNode("\u00A0");
    anchorNodeLinkElement.parentNode.insertBefore(safeSpacingTextNode, anchorNodeLinkElement.nextSibling);

    const adjustmentFocusSelection = window.getSelection();
    const adjustmentFocusRange = document.createRange();
    adjustmentFocusRange.setStartAfter(safeSpacingTextNode);
    adjustmentFocusRange.collapse(true);
    adjustmentFocusSelection.removeAllRanges();
    adjustmentFocusSelection.addRange(adjustmentFocusRange);

    compileActiveCanvasContentState();
}

function shutdownFloatingPopups() {
    document.getElementById("slash-command-menu").style.display = "none";
    document.getElementById("wiki-bi-link-menu").style.display = "none";
}

// Global Command Palette & Fuzzy Query Matrix Matching System Subroutines
function invokeCommandPaletteWindow(shouldDisplayState) {
    const paletteOverlayBoxElement = document.getElementById("command-palette");
    if (shouldDisplayState) {
        paletteOverlayBoxElement.style.display = "flex";
        const paletteInputFieldElement = document.getElementById("palette-search-input");
        paletteInputFieldElement.value = "";
        paletteInputFieldElement.focus();
        runFuzzySearchCalculationExecution(""); // Bootstrap dynamic results box mapping loop on initial open
    } else {
        paletteOverlayBoxElement.style.display = "none";
    }
}

function runFuzzySearchCalculationExecution(queryPattern) {
    const trackingQueryResultsOutputBin = document.getElementById("palette-results");
    trackingQueryResultsOutputBin.innerHTML = "";
    const standardizedSanitizedQuery = queryPattern.toLowerCase().trim();

    const matchedFilterDocumentArray = systemState.documents.filter(doc => {
        return doc.title.toLowerCase().includes(standardizedSanitizedQuery) || 
               doc.content.toLowerCase().includes(standardizedSanitizedQuery);
    });

    if (matchedFilterDocumentArray.length === 0) {
        trackingQueryResultsOutputBin.innerHTML = `<div class="muted-text" style="padding:12px; text-align:center;">No matching ecosystem nodes localized.</div>`;
        return;
    }

    matchedFilterDocumentArray.forEach(matchedDoc => {
        const unifiedRowResultNode = document.createElement("div");
        unifiedRowResultNode.className = "palette-row-item";
        unifiedRowResultNode.onclick = () => { invokeCommandPaletteWindow(false); routeToActiveDocument(matchedDoc.id); };

        // Eliminate markup formatting wrappers vectors from content view representation
        const flatSanitizedTextString = matchedDoc.content.replace(/<\/?[^>]+(>|$)/g, " ");

        unifiedRowResultNode.innerHTML = `
            <div class="title-row"><i class="fa-regular fa-file-lines"></i> ${matchedDoc.title}</div>
            <div class="preview-row">${flatSanitizedTextString || 'No text inside document canvas body...'}</div>
        `;
        trackingQueryResultsOutputBin.appendChild(unifiedRowResultNode);
    });
}

// Advanced Column Kanban Agile Drag and Drop Engine
function renderKanbanMatrixBoard() {
    const listTodoContainerElement = document.getElementById("bin-todo");
    const listProcessingContainerElement = document.getElementById("bin-progress");
    const listVerifiedContainerElement = document.getElementById("bin-done");

    listTodoContainerElement.innerHTML = "";
    listProcessingContainerElement.innerHTML = "";
    listVerifiedContainerElement.innerHTML = "";

    const activeScopedKanbanCardsArray = systemState.kanbanCards.filter(card => card.documentId === systemState.activeDocumentId);

    activeScopedKanbanCardsArray.forEach(cardData => {
        const individualCardWidgetNode = document.createElement("div");
        individualCardWidgetNode.className = "kanban-card";
        individualCardWidgetNode.id = cardData.id;
        individualCardWidgetNode.draggable = true;
        individualCardWidgetNode.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", cardData.id);
        });

        individualCardWidgetNode.innerHTML = `
            <span>${cardData.text}</span>
            <button class="card-purge-icon" onclick="purgeKanbanCardInstance('${cardData.id}')"><i class="fa-solid fa-trash"></i></button>
        `;

        if (cardData.status === "todo") listTodoContainerElement.appendChild(individualCardWidgetNode);
        if (cardData.status === "progress") listProcessingContainerElement.appendChild(individualCardWidgetNode);
        if (cardData.status === "done") listVerifiedContainerElement.appendChild(individualCardWidgetNode);
    });
}

function addNewKanbanCardPrompt() {
    const promptValueString = prompt("Input new discrete agile task specification context string:");
    if (!promptValueString || !promptValueString.trim()) return;

    const uniqueCardIdString = "card-" + Date.now();
    systemState.kanbanCards.push({
        id: uniqueCardIdString,
        documentId: systemState.activeDocumentId,
        text: promptValueString.trim(),
        status: "todo"
    });

    commitSystemStateToMemory();
    renderKanbanMatrixBoard();
}

function purgeKanbanCardInstance(cardId) {
    systemState.kanbanCards = systemState.kanbanCards.filter(c => c.id !== cardId);
    commitSystemStateToMemory();
    renderKanbanMatrixBoard();
}

function allowCardDrop(event) {
    event.preventDefault();
}

function executeCardDrop(event, targetColumnStatusIdentifier) {
    event.preventDefault();
    const droppedCardIdValue = event.dataTransfer.getData("text/plain");
    const matchingCardTargetDataNode = systemState.kanbanCards.find(c => c.id === droppedCardIdValue);

    if (matchingCardTargetDataNode) {
        matchingCardTargetDataNode.status = targetColumnStatusIdentifier;
        commitSystemStateToMemory();
        renderKanbanMatrixBoard();
    }
}

// System Theme Presets Matrices Dynamic Execution Engines
function switchSystemThemeMode(selectedThemeNamePreset) {
    systemState.systemTheme = selectedThemeNamePreset;
    systemState.customForgeColors = null;
    commitSystemStateToMemory();
    executeGlobalThemePaint();
}

function executeGlobalThemePaint() {
    const rootElementNode = document.documentElement;
    rootElementNode.removeAttribute("style"); // Flush custom variables to let standard layout themes hook down cleanly
    document.querySelectorAll(".theme-option-card").forEach(tc => tc.classList.remove("active"));

    if (systemState.systemTheme === "custom" && systemState.customForgeColors) {
        const runtimeColorMapObj = systemState.customForgeColors;
        rootElementNode.style.setProperty("--bg-main", runtimeColorMapObj.bgMain);
        rootElementNode.style.setProperty("--bg-sidebar", runtimeColorMapObj.bgSide);
        rootElementNode.style.setProperty("--bg-card", runtimeColorMapObj.bgCard);
        rootElementNode.style.setProperty("--text-main", runtimeColorMapObj.text);
        rootElementNode.style.setProperty("--accent", runtimeColorMapObj.accent);
        rootElementNode.style.setProperty("--border", runtimeColorMapObj.border);
    } else {
        rootElementNode.setAttribute("data-theme", systemState.systemTheme || "dark");
        const trackingActiveCardNodeElement = document.getElementById(`thm-card-${systemState.systemTheme}`);
        if (trackingActiveCardNodeElement) trackingActiveCardNodeElement.classList.add("active");
    }
}

function runLiveForgeCompilation() {
    const rootHtmlTagNode = document.documentElement;
    rootHtmlTagNode.style.setProperty("--bg-main", document.getElementById("f-bg-main").value);
    rootHtmlTagNode.style.setProperty("--bg-sidebar", document.getElementById("f-bg-side").value);
    rootHtmlTagNode.style.setProperty("--bg-card", document.getElementById("f-bg-card").value);
    rootHtmlTagNode.style.setProperty("--text-main", document.getElementById("f-text").value);
    rootHtmlTagNode.style.setProperty("--accent", document.getElementById("f-accent").value);
    rootHtmlTagNode.style.setProperty("--border", document.getElementById("f-border").value);
}

function commitForgeThemeToMemory() {
    systemState.systemTheme = "custom";
    systemState.customForgeColors = {
        bgMain: document.getElementById("f-bg-main").value,
        bgSide: document.getElementById("f-bg-side").value,
        bgCard: document.getElementById("f-bg-card").value,
        text: document.getElementById("f-text").value,
        accent: document.getElementById("f-accent").value,
        border: document.getElementById("f-border").value
    };
    commitSystemStateToMemory();
    executeGlobalThemePaint();
    alert("Custom System Color parameters applied inside local configuration tracks!");
}

// Export Portability Bundle Pipelines
function exportMasterNotebook() {
    const rawDataStringStream = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(systemState, null, 2));
    const structuralAnchorDownloaderNode = document.createElement("a");
    structuralAnchorDownloaderNode.setAttribute("href", rawDataStringStream);
    structuralAnchorDownloaderNode.setAttribute("download", `NexusVault_System_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(structuralAnchorDownloaderNode);
    structuralAnchorDownloaderNode.click();
    structuralAnchorDownloaderNode.remove();
}

function wipeLocalSystemMemoryCache() {
    if (confirm("Confirm complete system data reset? This flushes all local records out of active storage vectors forever.")) {
        localStorage.removeItem("NEXUS_WORKSPACE_DATA");
        window.location.reload();
    }
}
