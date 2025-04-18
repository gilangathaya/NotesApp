class NoteItem extends HTMLElement {
    connectedCallback() {
        this.id = this.getAttribute("id");
        this.title = this.getAttribute("title");
        this.body = this.getAttribute("body");
        this.createdAt = new Date(this.getAttribute("createdAt")).toLocaleString();
        this.archived = this.getAttribute("archived") === "true";

        this.innerHTML = `
            <div class="note-card">
                <h3>${this.title}</h3>
                <p>${this.body}</p>
                <small>Dibuat pada: ${this.createdAt}</small>
                <div class="actions">
                    <button class="archive-btn">${this.archived ? 'Batalkan Arsip' : 'Arsipkan'}</button>
                    <button class="delete-btn">Hapus</button>
                </div>
            </div>
        `;

        this.querySelector(".archive-btn").addEventListener("click", () => this.toggleArchiveStatus());
        this.querySelector(".delete-btn").addEventListener("click", () => this.deleteNote());
    }

    async toggleArchiveStatus() {
        try {
            let success;
            if (this.archived) {
                success = await unarchiveNote(this.id);
            } else {
                success = await archiveNote(this.id);
            }
            
            if (success) {
                document.dispatchEvent(new Event("notesUpdated"));
            }
        } catch (error) {
            console.error('Error toggling archive status:', error);
        }
    }

    async deleteNote() {
        try {
            const confirmDelete = confirm('Apakah Anda yakin ingin menghapus catatan ini?');
            if (confirmDelete) {
                const success = await deleteNote(this.id);
                if (success) {
                    document.dispatchEvent(new Event("notesUpdated"));
                }
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }
}

customElements.define("note-item", NoteItem);