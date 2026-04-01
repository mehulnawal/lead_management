import { Router } from 'express';
import { addLead, deleteLead, leadsStats, singleLead, updateLead, viewAllLeads } from '../controllers/lead.controller.js';
const leadRouter = Router();

leadRouter.get('/', viewAllLeads);
leadRouter.get('/stats', leadsStats);
leadRouter.get('/:leadId', singleLead);
leadRouter.post('/', addLead);
leadRouter.put('/:leadId', updateLead);
leadRouter.delete('/:leadId', deleteLead);

export default leadRouter;