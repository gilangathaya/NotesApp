class NoteItem extends HTMLElement {
    connectedCallback() {
        this.id = this.getAttribute("id");
        this.title = this.getAttribute("title");
        this.body = this.getAttribute("body");
        this.createdAt = new Date(this.getAttribute("createdAt")).toLocaleString();

        this.innerHTML = `
            <div class="note-card">
                <h3>${this.title}</h3>
                <p>${this.body}</p>
                <small>Dibuat pada: ${this.createdAt}</small>
                <div class="actions">
                    <button class="archive-btn">Arsipkan</button>
                    <button class="delete-btn">Hapus</button>
                </div>
            </div>
        `;

        this.querySelector(".archive-btn").addEventListener("click", () => this.archiveNote());
        this.querySelector(".delete-btn").addEventListener("click", () => this.deleteNote());
    }

    archiveNote() {
        const note = notesData.find(n => n.id === this.id);
        if (note) {
            note.archived = !note.archived;
            document.dispatchEvent(new Event("notesUpdated"));
        }
    }

    deleteNote() {
        const index = notesData.findIndex(n => n.id === this.id);
        if (index !== -1) {
            notesData.splice(index, 1);
            document.dispatchEvent(new Event("notesUpdated"));
        }
    }
}

customElements.define("note-item", NoteItem);

document.addEventListener("notesUpdated", () => {
    document.querySelector("#notes-container").innerHTML = "";
    notesData
        .filter(note => !note.archived)
        .forEach(note => {
            const noteElement = document.createElement("note-item");
            noteElement.setAttribute("id", note.id);
            noteElement.setAttribute("title", note.title);
            noteElement.setAttribute("body", note.body);
            noteElement.setAttribute("createdAt", note.createdAt);
            document.querySelector("#notes-container").appendChild(noteElement);
        });
});
