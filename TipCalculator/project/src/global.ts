export interface IGlobalTipCalculator {
    bill?: number
    tip?: number
    people?: number
    tipSelectedBtn?: HTMLButtonElement
    SetTipSelectedBtn: (sel: HTMLButtonElement) => void
    UnsetTipSelectedBtn: () => void
}

export const tipCalculator: IGlobalTipCalculator = {
    SetTipSelectedBtn: function(sel) {
        if (this.tipSelectedBtn)
            this.UnsetTipSelectedBtn()
        this.tipSelectedBtn = sel
        sel.classList.add('active')
    },
    UnsetTipSelectedBtn: function() {
        if (this.tipSelectedBtn)
            this.tipSelectedBtn.classList.remove('active')
        this.tipSelectedBtn = undefined
    }
}
