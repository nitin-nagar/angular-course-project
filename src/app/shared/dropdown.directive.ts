import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from "@angular/core";

@Directive({
    selector:'[appDropdown]'
})
export class Dropdown{
    @HostBinding('class.open') isOpen = false
    constructor(private elementRef:ElementRef){}
    // @HostListener('click') click(){
    //     this.isOpen = !this.isOpen;
    // }
    @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
        this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
      }
}
