import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-filter-toggle',
    templateUrl: './filter-toggle-component.html'
})
export class FilterToggleComponent {

    @Output() toggleFilter: EventEmitter<null> = new EventEmitter();
    // Ensure to set launch an event from here
    // Event will be captured by main
    // Main may toggle
    toggleClick() {
        this.toggleFilter.emit();
    }
}
