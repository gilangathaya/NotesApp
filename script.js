// script.js
document.addEventListener("DOMContentLoaded", async () => {
    const notesContainer = document.getElementById("notes-container");
    const archivedNotesContainer = document.getElementById("archived-notes-container");
    const noteForm = document.getElementById("note-form");
    const titleInput = document.getElementById("title");
    const bodyInput = document.getElementById("body");
    const errorMessage = document.getElementById("error-message");
    const showActiveBtn = document.getElementById("show-active");
    const showArchivedBtn = document.getElementById("show-archived");
    const activeSection = document.getElementById("notes-list");
    const archivedSection = document.getElementById("archived-notes");
    
    // Initial load
    await loadNotes();
    
    // Event listeners for tab switching
    showActiveBtn.addEventListener("click", () => {
        activeSection.style.display = "block";
        archivedSection.style.display = "none";
        showActiveBtn.classList.add("active");
        showArchivedBtn.classList.remove("active");
    });
    
    showArchivedBtn.addEventListener("click", async () => {
        activeSection.style.display = "none";
        archivedSection.style.display = "block";
        showActiveBtn.classList.remove("active");
        showArchivedBtn.classList.add("active");
        await loadArchivedNotes();
    });

    // Load active notes
    async function loadNotes() {
        notesContainer.innerHTML = "";
        const notes = await getNotes();
        
        if (notes.length === 0) {
            notesContainer.innerHTML = "<p class='empty-message'>Belum ada catatan. Silakan tambahkan!</p>";
            return;
        }
        
        notes.forEach(note => {
            const noteElement = document.createElement("note-item");
            noteElement.setAttribute("id", note.id);
            noteElement.setAttribute("title", note.title);
            noteElement.setAttribute("body", note.body);
            noteElement.setAttribute("createdAt", note.createdAt);
            noteElement.setAttribute("archived", "false");
            notesContainer.appendChild(noteElement);
        });
    }
    
    // Load archived notes
    async function loadArchivedNotes() {
        archivedNotesContainer.innerHTML = "";
        const archivedNotes = await getArchivedNotes();
        
        if (archivedNotes.length === 0) {
            archivedNotesContainer.innerHTML = "<p class='empty-message'>Tidak ada catatan yang diarsipkan.</p>";
            return;
        }
        
        archivedNotes.forEach(note => {
            const noteElement = document.createElement("note-item");
            noteElement.setAttribute("id", note.id);
            noteElement.setAttribute("title", note.title);
            noteElement.setAttribute("body", note.body);
            noteElement.setAttribute("createdAt", note.createdAt);
            noteElement.setAttribute("archived", "true");
            archivedNotesContainer.appendChild(noteElement);
        });
    }

    // Form validation
    function validateInput() {
        if (titleInput.value.trim() === "" || bodyInput.value.trim() === "") {
            errorMessage.textContent = "Judul dan isi tidak boleh kosong!";
            return false;
        } else {
            errorMessage.textContent = "";
            return true;
        }
    }

    titleInput.addEventListener("input", validateInput);
    bodyInput.addEventListener("input", validateInput);

    // Form submission
    noteForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (!validateInput()) return;

        const result = await addNote(titleInput.value, bodyInput.value);
        if (result) {
            titleInput.value = "";
            bodyInput.value = "";
            errorMessage.textContent = "";
            await loadNotes();
        }
    });

    // Listen for updates to reload notes
    document.addEventListener("notesUpdated", async () => {
        if (activeSection.style.display !== "none") {
            await loadNotes();
        } else {
            await loadArchivedNotes();
        }
    });
});