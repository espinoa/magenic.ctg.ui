import { Component } from "@angular/core";

import { FileDndDirective } from './file-dnd.directive';
import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core/src/debug/debug_node";
import { FileService } from "@shared/services/file/file.service";

describe('FileDndDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let directiveInstance: FileDndDirective;

    let directiveEl: DebugElement;
    let dropzoneEl: DebugElement;
    const testAllowedExtensions = ['xls', 'xlsx'];

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                FileDndDirective
            ],
            providers: [FileService]
        });
    });

    beforeEach(() => {
        TestBed.overrideComponent(TestComponent, {
            set: {
                template: '<div class="dropzone" fileDnd></div>'
            }
        })

        fixture = TestBed.createComponent(TestComponent);
    
        directiveEl = fixture.debugElement.query(By.directive(FileDndDirective));
        directiveInstance = directiveEl.injector.get(FileDndDirective);

        fixture.detectChanges();
    });

    it('should create an instance', async(() => {
        expect(directiveEl).not.toBeNull();
    }));

    it('should set the allowed extensions', async(() => {
        directiveInstance.allowedExtensions = testAllowedExtensions;
        expect(directiveInstance.allowedExtensions).toBe(testAllowedExtensions);
    }))

    it('should set the styling css on dragover', async(() => {
        // The dropzone before the drag over has no 'file-drag-over' css class.
        expect(directiveEl.nativeElement.classList.contains('file-drag-over')).toBe(false);

        // Simulate file drag in drop zone.
        directiveInstance.onDragover(new Event('ondragover'));
        fixture.detectChanges();
        
        // The dropzone during the drag over would have 'file-drag-over' css class.
        expect(directiveEl.nativeElement.classList.contains('file-drag-over')).toBe(true);
    }))
});

// Test Component
@Component({
    selector: 'test-cmp',
    template: ''
})
class TestComponent { }