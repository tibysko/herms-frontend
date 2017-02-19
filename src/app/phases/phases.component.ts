declare var $: any;
import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { Response } from '@angular/http';

import { Phase } from './phase.interface';
import { PhaseService } from './phase.service';
import { Valve, ValveState } from '../model/valve.interface';
import { ValveService } from "../manual-operation/valve.service";


@Component({
    selector: 'phases',
    templateUrl: 'phases.component.html'
})

export class PhasesComponent implements OnInit {
    @ViewChild('childModal') public phaseModal: ModalDirective;

    modalModel: Phase = { name: '', active: false, valves: [], id: '' };
    phases: Phase[] = [];
    valves: Valve[] = [];

    phaseToggles = [
        { value: ValveState[ValveState.OPENED], display: 'Opened' },
        { value: ValveState[ValveState.CLOSED], display: 'Closed' },
    ];

    constructor(private notificationsService: NotificationsService,
        private phaseService: PhaseService,
        private valveService: ValveService) { }

    ngOnInit() {
        this.fetchPhases();
        this.fetchValves();
    }

    openCreatePhase() {
        this.modalModel.name = '';
        this.modalModel.id = undefined;
        let valves: Valve[] = [];

        for (let valve of this.valves) {
            valves.push({
                name: valve.name,
                state: ValveState[ValveState.CLOSED]
            });
        }

        this.modalModel.valves = valves;
        this.showModal();
    }

    openEditPhase(phase: Phase) {
        this.modalModel.name = phase.name;
        this.modalModel.id = phase.id;
        this.modalModel.valves = phase.valves.slice(0, phase.valves.length); // copy array

        this.showModal();
    }

    savePhase(phase: Phase) {
        if (phase.id) { // id exists, update phase
            this.phaseService.updatePhase(phase).then((res: Response) => {
                this.notificationsService.success('Phase', 'Successfully saved ' + phase.name);
                this.fetchPhases();

                this.phaseModal.hide();
            }).catch((reason) => {
                this.notificationsService.error('Phase', 'Could not update [' + phase.name + ']');
            });
        } else { // create phase
            this.phaseService.createPhase(phase).then((res: Response) => {
                this.fetchPhases();

                this.phaseModal.hide();
                this.notificationsService.success('Phase', 'Successfully saved ' + phase.name);
            }).catch((reason) => {
                this.notificationsService.error('Phase', 'Could not save [' + phase.name + ']');
            });
        }
    }


    activatePhase(phase: Phase) {
        this.phaseService.activatePhase(phase.id).then((res: Response) => {
            this.notificationsService.success('Phase', 'Phase ' + phase.name + ' activated, system adjusting');
            this.fetchPhases();
         }).catch((reason) => {
            this.notificationsService.error('Phase', 'Could not activate [' + phase.name + ']');
        });
    }

    deletePhase(phase:Phase){
        this.phaseService.deletePhase(phase.id).then((res: Response) => {
            this.notificationsService.success('Phase', 'successfully deleted [' + phase.name + ']');
            this.fetchPhases(); 
        }).catch((reason) => {
            this.notificationsService.error('Phase', 'Could not delete [' + phase.name + ']');
        })
    }

    private showModal() {
        this.phaseModal.show();
        setTimeout(() => {
            $.material.init()
        }, 100); // ugly hack to reinitialize material
    }

    private fetchPhases(): void {
        this.phaseService.getPhases().then((phases: Phase[]) => {
            this.phases = phases
        });
    }

    private fetchValves(): void {
        this.valveService.getValves().then((valves: Valve[]) => {
            this.valves = valves;
        });
    }
}