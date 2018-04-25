export class ChipContent {
    selectedChips: string[];
    chipOptions: string[];

    constructor(private selectionOptions: string[], selectedList?: string[]) {
        this.chipOptions = selectionOptions;
        this.selectedChips = selectedList ? selectedList : [];
    }
}
