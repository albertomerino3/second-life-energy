import { Op } from "sequelize";
import { QuestionReport } from "./question-reports.model.js";
import { Question } from "../questions/question.model.js";
import { ForumCategory } from "../forum-categories/forum-category.model.js";


const includeRelations = [
    {
        model: Question,
        as: "question",
        attributes: ["id", "title", "content", "status"],
        include: [
            {
                model: ForumCategory,
                as: "category",
                attributes: ["id", "name"],
            },
        ],
    },
];

export class QuestionReportService {
    static async findAll() {
        return QuestionReport.findAll({
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    static async findById(id: number) {
        return QuestionReport.findByPk(id, {
            include: includeRelations,
        });
    }

    static async create(data: {
        questionId: number;
        reason: string;
        status?: string;
        severity: number;
    }) {
        return QuestionReport.create(data);
    }

    static async update(question_report: QuestionReport, data: {
        reason?: string;
        status?: string;
        severity?: number;
    }) {
        return question_report.update(data, {
            fields: [
                "reason",
                "status",
                "severity"
            ]
        });
    }

    static async delete(question_report: QuestionReport) {
        await question_report.destroy();
    }

    //EAGER: search by questionId
    static async findAllEagerlyByQuestionId(questionId: number) {
        return QuestionReport.findAll({
            where: { questionId },
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    //EAGER: search by status
    static async findAllEagerlyByQuestionStatus(status: string) {
        return QuestionReport.findAll({
            include: [
                {
                    model: Question,
                    as: "question",
                    required: true,
                    where: { status },
                },
            ],
            order: [["id", "ASC"]],
        });
    }

    //EAGER: search by severity gt
    static async findBySeverityGreaterThan(minSeverity: number) {
        return QuestionReport.findAll({
            where: {
                severity: {
                    [Op.gt]: minSeverity,
                },
            },
            include: includeRelations,
            order: [["severity", "DESC"]],
        });
    }

    //EAGER: search by text (reason)
    static async searchByReason(text: string) {
        return QuestionReport.findAll({
            where: {
                reason: {
                    [Op.like]: `%${text}%`,
                },
            },
            include: includeRelations,
            order: [["id", "ASC"]],
        });
    }

    //EAGER: search QUESTIONS by pending reports --> main --> QUESTION
    static async findQuestionsWithPendingReports() {
        return Question.findAll({
            include: [
                {
                    model: QuestionReport,
                    as: "reports",
                    required: true,
                    where: {
                        status: "pending",
                    },
                },
            ],
            order: [["id", "ASC"]],
        });
    }

    //EAGER: question + category + report
    static async findDetailedQuestionReports() {
        return QuestionReport.findAll({
            include: [
                {
                    model: Question,
                    as: "question",
                    required: true,
                    include: [
                        {
                            model: ForumCategory,
                            as: "category",
                            required: false,
                        },
                    ],
                },
            ],
            order: [["id", "ASC"]],
        });
    }
}
