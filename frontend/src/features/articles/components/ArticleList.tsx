import Button from '../../../components/ui/Button'
import type { ArticleListItem } from '../types/article'
import ArticleStatusBadge from './ArticleStatusBadge.js'

export default function ArticleList({ articles, onEdit, onDelete }: {
    articles: ArticleListItem[]
    onEdit: (article: ArticleListItem) => void
    onDelete: (article: ArticleListItem) => void
}) {
    return <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
            <caption className="sr-only">Articles</caption>
            <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">Name</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Category</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Type</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Stock</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Status</th>
                    <th scope="col" className="px-4 py-3 font-semibold">Updated</th>
                    <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {articles.map(article => <tr key={article.id}>
                    <th scope="row" className="px-4 py-3 font-medium [overflow-wrap:anywhere]">{article.name}</th>
                    <td className="px-4 py-3">{article.categoryName}</td>
                    <td className="px-4 py-3 capitalize">{article.type}</td>
                    <td className="px-4 py-3">{article.stock}</td>
                    <td className="px-4 py-3"><ArticleStatusBadge status={article.status} /></td>
                    <td className="whitespace-nowrap px-4 py-3">{new Date(article.updatedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                            <Button variant="secondary" aria-label={`Edit ${article.name}`} onClick={() => onEdit(article)} className="rounded px-3 py-1">Edit</Button>
                            <Button variant="danger" aria-label={`Delete ${article.name}`} onClick={() => onDelete(article)} className="rounded px-3 py-1">Delete</Button>
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </div>
}