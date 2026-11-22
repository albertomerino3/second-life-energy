
import { Request, Response, NextFunction } from "express";
import { QuestionReportService } from "./question-reports.service.js";
import { REPORT_STATUSES } from "./question-reports.model.js";

export class QuestionReportController {

    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await QuestionReportService.findAll();
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const item = await QuestionReportService.findById(Number(req.params.id));

            if (!item) {
                res.status(404).json({ message: "Question report not found" });
                return;
            }

            res.json(item);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { questionId, reason, status, severity } = req.body;

            if (!questionId || !reason || severity === undefined) {
                res.status(400).json({
                    message: "questionId, reason and severity are required",
                });
                return;
            }

            if (status && !(REPORT_STATUSES as readonly string[]).includes(status)) {
                res.status(400).json({
                    message: "Invalid status",
                    allowedStatuses: REPORT_STATUSES,
                });
                return;
            }

            if (severity < 1 || severity > 5) {
                res.status(400).json({ message: "Severity must be between 1 and 5" });
                return;
            }

            const created = await QuestionReportService.create({
                questionId,
                reason,
                status,
                severity,
            });

            res.status(201).json(created);
        } catch (error) {
            next(error);
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const item = await QuestionReportService.findById(Number(req.params.id));

            if (!item) {
                res.status(404).json({ message: "Question report not found" });
                return;
            }

            const updated = await QuestionReportService.update(item, req.body);
            res.json(updated);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const item = await QuestionReportService.findById(Number(req.params.id));

            if (!item) {
                res.status(404).json({ message: "Question report not found" });
                return;
            }

            await QuestionReportService.delete(item);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }

    // GET /question-reports/question/:questionId
    static async getByQuestionId(req: Request, res: Response, next: NextFunction) {
        try {
            const items =
                await QuestionReportService.findAllEagerlyByQuestionId(
                    Number(req.params.questionId)
                );
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    // GET /question-reports/question-status/:status
    static async getByQuestionStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const status =
                typeof req.params.status === "string"
                    ? req.params.status
                    : undefined;

            if (!status) {
                res.status(400).json({ message: "Status is required" });
                return;
            }

            const items =
                await QuestionReportService.findAllEagerlyByQuestionStatus(status);

            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    // GET /question-reports/severity/:min
    static async getBySeverity(req: Request, res: Response, next: NextFunction) {
        try {
            const items =
                await QuestionReportService.findBySeverityGreaterThan(
                    Number(req.params.min)
                );
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    // GET /question-reports/search/:text
    static async search(req: Request, res: Response, next: NextFunction) {
        try {
            const text =
                typeof req.params.text === "string"
                    ? req.params.text
                    : undefined;

            if (!text) {
                res.status(400).json({ message: "Search text is required" });
                return;
            }

            const items = await QuestionReportService.searchByReason(text);
            res.json(items);
        } catch (error) {
            next(error);
        }
    }

    // GET /question-reports/pending-questions
    static async getQuestionsWithPendingReports(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const items =
                await QuestionReportService.findQuestionsWithPendingReports();
            res.json(items);
        } catch (error) {
            next(error);
        }
    }


    // GET /question-reports/detailed
    static async getDetailed(req: Request, res: Response, next: NextFunction) {
        try {
            const items =
                await QuestionReportService.findDetailedQuestionReports();
            res.json(items);
        } catch (error) {
            next(error);
        }
    }
}
