document.addEventListener("DOMContentLoaded", () => {
    const notesContainer = document.getElementById("notes-container");
    const noteForm = document.getElementById("note-form");
    const titleInput = document.getElementById("title");
    const bodyInput = document.getElementById("body");
    const errorMessage = document.getElementById("error-message");

    function displayNotes() {
        notesContainer.innerHTML = "";
        notesData
            .filter(note => !note.archived) // Hanya menampilkan yang tidak diarsipkan
            .forEach(note => {
                const noteElement = document.createElement("note-item");
                noteElement.setAttribute("id", note.id);
                noteElement.setAttribute("title", note.title);
                noteElement.setAttribute("body", note.body);
                noteElement.setAttribute("createdAt", note.createdAt);
                notesContainer.appendChild(noteElement);
            });
    }

    // validasi real-time saat ngetik
    function validateInput() {
        if (titleInput.value.trim() === "" || bodyInput.value.trim() === "") {
            errorMessage.textContent = "Judul dan isi tidak boleh kosong!";
        } else {
            errorMessage.textContent = "";
        }
    }

    titleInput.addEventListener("input", validateInput);
    bodyInput.addEventListener("input", validateInput);

    noteForm.addEventListener("submit", (e) => {
        e.preventDefault();
        validateInput(); // Pastikan validasi dijalankan saat submit

        if (errorMessage.textContent !== "") return; // Jangan submit jika ada error

        notesData.push({
            id: `notes-${Date.now()}`,
            title: titleInput.value,
            body: bodyInput.value,
            createdAt: new Date().toISOString(),
            archived: false
        });

        titleInput.value = "";
        bodyInput.value = "";
        errorMessage.textContent = "";
        displayNotes();
    });

    displayNotes();
});
